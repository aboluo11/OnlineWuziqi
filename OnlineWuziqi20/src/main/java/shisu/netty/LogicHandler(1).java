package shisu.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.CloseWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.timeout.IdleStateEvent;
import org.json.JSONObject;
import shisu.dao.PlayerMapper;
import shisu.dao.Player;
import shisu.util.DaoContainer;
import shisu.util.ReadyHandlerThread;

import java.util.concurrent.*;

public class LogicHandler extends SimpleChannelInboundHandler {
    private volatile ChannelHandlerContext anotherCtx;
    private volatile int id;
    private int idleCount = 0;
    private static final ExecutorService executor = Executors.newFixedThreadPool(100);
    private static final ConcurrentHashMap<Integer, ChannelHandlerContext> loginedMap = new ConcurrentHashMap<>();
    private static final PlayerMapper playerMapper = DaoContainer.getPlayerMapper();
    private static final BlockingQueue<ChannelHandlerContext> readyQueue = ReadyHandlerThread.getReadyQueue();

    public void setAnotherCtx(ChannelHandlerContext anotherCtx) {
        this.anotherCtx = anotherCtx;
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof TextWebSocketFrame) {
            idleCount = 0;
            String message = ((TextWebSocketFrame) msg).text();
            JSONObject data = new JSONObject(message);
            String type = data.getString("type");
            if (type.equals("ready")) {
                ready(ctx);
            } else if (type.equals("coo")) {
                coo(data);
            } else if (type.equals("win")) {
                win(ctx, data);
            } else if (type.equals("login")) {
                login(ctx, data);
            } else if (type.equals("forceLogin")) {
                forceLogin(ctx, data);
            } else if (type.equals("logout")) {
                logout(ctx);
            } else if (type.equals("register")) {
                register(ctx, data);
            }
        } else if (msg instanceof CloseWebSocketFrame) {
            ctx.close();
        }
    }

    private void ready(ChannelHandlerContext ctx) throws InterruptedException {
        readyQueue.offer(ctx);
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        loginedMap.remove(this.id, ctx);
        executor.execute(() -> {
            final ChannelHandlerContext anotherCtx = this.anotherCtx;
            LogicHandler anotherHandler = null;
            boolean playing = false;
            synchronized (ctx) {
                if (this.anotherCtx != null) {
                    playing = true;
                    anotherHandler = (LogicHandler) this.anotherCtx.handler();
                    anotherHandler.setAnotherCtx(null);
                }
            }

            if (playing) {
                JSONObject result = new JSONObject();
                result.put("type", "drop");
                anotherCtx.writeAndFlush(new TextWebSocketFrame(result.toString()));
                int winId = anotherHandler.id;
                int defeatId = this.id;
                winDao(winId, defeatId);
            }
        });
    }

    private void win(ChannelHandlerContext ctx, JSONObject data) {
        final ChannelHandlerContext anotherCtx = this.anotherCtx;
        if (anotherCtx == null) return;
        boolean playing = false;
        LogicHandler anotherHandler = (LogicHandler) anotherCtx.handler();
        synchronized (anotherCtx) {
            if (this.anotherCtx != null) {
                playing = true;
                this.setAnotherCtx(null);
                anotherHandler.setAnotherCtx(null);
            }
        }
        if (playing) {
            JSONObject win = new JSONObject();
            win.put("type", "win");
            ctx.writeAndFlush(new TextWebSocketFrame(win.toString()));
            JSONObject defeat = new JSONObject(data.toMap());
            defeat.put("type", "defeat");
            anotherCtx.writeAndFlush(new TextWebSocketFrame(defeat.toString()));
            int winId = this.id;
            int defeatId = anotherHandler.id;
            executor.execute(()->{
                winDao(winId, defeatId);
            });
        }
    }

    private static void winDao(int winId, int defeatId) {
        playerMapper.win(winId);
        playerMapper.defeat(defeatId);
    }

    private void coo(JSONObject data) {
        final ChannelHandlerContext anotherCtx = this.anotherCtx;
        if (anotherCtx != null) {
            anotherCtx.writeAndFlush(new TextWebSocketFrame(data.toString()));
        }
    }

    private void login(ChannelHandlerContext ctx, JSONObject data) {
        String name = data.getString("name");
        String pwd = data.getString("pwd");
        executor.execute(() -> {
            Player me = playerMapper.getPlayerByName(name);
            JSONObject result = new JSONObject();
            result.put("type", "login");
            if (me != null && me.getPwd().equals(pwd)) {
                int id = me.getId();
                ChannelHandlerContext previous = loginedMap.putIfAbsent(id, ctx);
                if (previous != null) {
                    result.put("message", "hasLogin");
                } else {
                    result.put("message", "success");
                    this.id = id;
                }
                me.setPwd(null);
                result.put("me", new JSONObject(me));
            } else {
                result.put("message", "wrong");
            }
            ctx.writeAndFlush(new TextWebSocketFrame(result.toString()));
        });
    }

    private void forceLogin(ChannelHandlerContext ctx, JSONObject data) throws Exception {
        int id = data.getInt("id");
        ChannelHandlerContext previousCtx = loginedMap.put(id, ctx);
        if (previousCtx != null) {
            previousCtx.close();
        }
        this.id = id;
    }

    private void logout(ChannelHandlerContext ctx) throws Exception {
        ctx.close();
    }

    private void register(ChannelHandlerContext ctx, JSONObject data) {
        String name = data.getString("name");
        String pwd = data.getString("pwd");
        JSONObject result = new JSONObject();
        result.put("type", "register");
        executor.execute(() -> {
            boolean success = false;
            Player me;
            synchronized (("register_" + name).intern()) {
                me = playerMapper.getPlayerByName(name);
                if (me == null) {
                    me = new Player(name, pwd);
                    playerMapper.addPlayer(me);
                    success = true;
                }
            }
            if (success) {
                ChannelHandlerContext previousCtx = loginedMap.putIfAbsent(me.getId(), ctx);
                me.setPwd(null);
                result.put("message", "success");
                result.put("me", new JSONObject(me));
                this.id = me.getId();
                if (previousCtx != null) {
                    previousCtx.close();
                }
            } else {
                result.put("message", "fail");
            }
            ctx.writeAndFlush(new TextWebSocketFrame(result.toString()));
        });
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
        if(evt instanceof IdleStateEvent){
            if(idleCount ==1) ctx.close();
            else idleCount++;
        }
    }
}
