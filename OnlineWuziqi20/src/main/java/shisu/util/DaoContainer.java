package shisu.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import shisu.dao.PlayerMapper;

@Component
public class DaoContainer {
    private static PlayerMapper playerMapper;

    @Autowired
    public DaoContainer(PlayerMapper playerMapper) {
        DaoContainer.playerMapper = playerMapper;
    }

    public static PlayerMapper getPlayerMapper() {
        return playerMapper;
    }
}
