package shisu.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import shisu.dao.PlayerMapper;
import shisu.dao.Player;

import java.util.List;

@RestController
public class GetPlayersController {
    private static volatile List<Player> players;

    public static void setPlayers(List<Player> players) {
        GetPlayersController.players = players;
    }

    @RequestMapping("/api/getPlayers")
    public String getPlayers(){
        JSONObject result = new JSONObject();
        result.put("players", players);
        return result.toString();
    }
}
