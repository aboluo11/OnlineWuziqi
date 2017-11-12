package shisu.netty;

import io.netty.buffer.ByteBuf;
import io.netty.channel.embedded.EmbeddedChannel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class LogicHandlerTest {
    @Test
    void testReady() {
        EmbeddedChannel channel1 = new EmbeddedChannel(new LogicHandler());
        EmbeddedChannel channel2 = new EmbeddedChannel(new LogicHandler());
        JSONObject login = new JSONObject();
        login.put("type","login");
        login.put("name","zzz");
        login.put("pwd","zzz");
        channel1.writeInbound(new TextWebSocketFrame(login.toString()));
        login.put("name","mi");
        login.put("pwd","mi");
        channel2.writeInbound(new TextWebSocketFrame(login.toString()));
        JSONObject message = new JSONObject();
        message.put("type","ready");
        channel1.writeInbound(new TextWebSocketFrame(message.toString()));
        channel2.writeInbound(new TextWebSocketFrame(message.toString()));
        JSONObject win = new JSONObject();
        win.put("type","win");
        channel1.writeInbound(new TextWebSocketFrame(win.toString()));
/*        for(int i=0;i<2;i++){
            channel1.readOutbound();
        }
        for(int i=0;i<1;i++){
            channel2.readOutbound();
        }*/
        System.out.println((String) channel1.readOutbound());
    }
}