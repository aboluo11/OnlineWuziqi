package shisu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import shisu.controller.GetPlayersController;
import shisu.dao.Player;
import shisu.dao.PlayerMapper;
import shisu.netty.Server;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class SpringBoot {
    @Autowired
    private PlayerMapper playerMapper;

    @Bean
    public ApplicationRunner runAtStart() throws Exception {
        return (applicationArguments) -> {
            ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
            executorService.scheduleAtFixedRate(()->{
                List<Player> players = playerMapper.getTop3PlayersWithoutPwd();
                GetPlayersController.setPlayers(players);
            },0,30, TimeUnit.SECONDS);
            new Server().run();
        };
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringBoot.class, args);
    }
}
