package shisu.netty;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.HttpRequest;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshaker;
import io.netty.handler.codec.http.websocketx.WebSocketServerHandshakerFactory;

/**
 * Created by 11215 on 2017/3/25.
 */
public class HttpUpgradeHandler extends SimpleChannelInboundHandler {

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        if(msg instanceof HttpRequest){
            HttpRequest request = (HttpRequest)msg;
            WebSocketServerHandshakerFactory webSocketServerHandshakerFactory = new WebSocketServerHandshakerFactory("ws://127.0.0.1:8081/ws",null,false);
            WebSocketServerHandshaker handshaker = webSocketServerHandshakerFactory.newHandshaker(request);
            handshaker.handshake(ctx.channel(),request);
            ctx.pipeline().remove(this);
        }
    }
}
