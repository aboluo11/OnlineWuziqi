package shisu.dao;

/**
 * Created by 11215 on 2017/3/19.
 */
public class Player {
    private Integer id;
    private String name;

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    private String pwd;
    private Integer winGames;
    private Integer totalGames;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPwd() {
        return pwd;
    }

    public Integer getWinGames() {
        return winGames;
    }

    public Integer getTotalGames() {
        return totalGames;
    }

    public Player(Integer id, String name, String pwd, Integer winGames, Integer totalGames) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
        this.winGames = winGames;
        this.totalGames = totalGames;
    }

    public Player(Integer id, String name, Integer winGames, Integer totalGames) {
        this.id = id;
        this.name = name;
        this.winGames = winGames;
        this.totalGames = totalGames;
    }

    public Player(String name,String pwd){
        this.name = name;
        this.pwd = pwd;
        this.totalGames = 0;
        this.winGames = 0;
    }
}
