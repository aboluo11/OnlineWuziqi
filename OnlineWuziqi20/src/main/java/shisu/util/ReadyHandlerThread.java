package shisu.util;

import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.json.JSONObject;
import shisu.netty.LogicHandler;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ReadyHandlerThread extends Thread {
    private static final BlockingQueue<ChannelHandlerContext> readyQueue = new LinkedBlockingQueue<>();

    public static BlockingQueue<ChannelHandlerContext> getReadyQueue() {
        return readyQueue;
    }

    @Override
    public void run() {
        JSONObject result = new JSONObject();
        ChannelHandlerContext ready = null;
        while (true) {
            ChannelHandlerContext one = null;
            try {
                one = readyQueue.take();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            if (ready == null) {
                ready = one;
                ready(result, ready);
            } else {
                LogicHandler readyHandler = (LogicHandler) ready.handler();
                LogicHandler oneHandler = (LogicHandler) one.handler();
                synchronized (ready) {
                    synchronized (one) {
                        if (!ready.channel().isActive()) {
                            ready = one;
                            ready(result, ready);
                            continue;
                        }
                        if (!one.channel().isActive()) {
                            continue;
                        }
                        readyHandler.setAnotherCtx(one);
                        oneHandler.setAnotherCtx(ready);
                    }
                }

                result.put("type", "play");
                ready.writeAndFlush(new TextWebSocketFrame(result.toString()));
                one.writeAndFlush(new TextWebSocketFrame(result.toString()));
                ready = null;
            }
        }
    }

    private void ready(JSONObject result, ChannelHandlerContext ctx) {
        result.put("type", "ready");
        ctx.writeAndFlush(new TextWebSocketFrame(result.toString()));
    }
}
