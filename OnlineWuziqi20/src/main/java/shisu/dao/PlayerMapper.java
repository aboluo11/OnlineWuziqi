package shisu.dao;

import org.apache.ibatis.annotations.*;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface PlayerMapper {
    @Select("select id,name,win_games,total_games from player where id = #{id}")
    Player getPlayerWithoutPwdById(int id);
    @Select("select id,name,win_games,total_games from player order by win_games/total_games desc,total_games desc limit 3")
    List<Player> getTop3PlayersWithoutPwd();
    @Select("select * from player where name = #{name}")
    Player getPlayerByName(String name);
    @Update("update player set total_games=total_games+1,win_games=win_games+1 where id = #{id}")
    void win(int id);
    @Update("update player set total_games=total_games+1 where id = #{id}")
    void defeat(int id);
    @Options(useGeneratedKeys = true)
    @Insert("insert into player(name,pwd,total_games,win_games) values (#{name},#{pwd},0,0)")
    boolean addPlayer(Player player);
}
