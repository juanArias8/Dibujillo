package com.edu.udea.sever;

import com.edu.udea.ws.Figure;
import com.edu.udea.ws.FigureDecoder;
import com.edu.udea.ws.FigureEncoder;
import java.io.IOException;
import java.io.StringReader;
import static java.lang.String.format;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/dibujillo",
        encoders={FigureEncoder.class},
        decoders={FigureDecoder.class})
public class MyWhiteboard {
private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    @OnMessage
    public void broadcastFigure(Figure figure, Session session) throws IOException, EncodeException{
        String message = figure.getJson().toString(); 
        JsonObject jsonObject = Json.createReader(new StringReader(message)).readObject();
        System.out.println(jsonObject);
        for(Session peer:peers){
            if(!peer.equals(session)){
              peer.getBasicRemote().sendObject(figure);
            }
            peer.getBasicRemote().sendObject(peers);
        }
    }
            
    @OnOpen
    public void onOpen(Session peer) {
        System.out.println(format("%s joined:", peer.getId()));
        peers.add(peer);
    }

    @OnClose
    public void onClose(Session peer) {
        System.out.println(format("%s left:", peer.getId()));
        peers.remove(peer);
    }
    
}
