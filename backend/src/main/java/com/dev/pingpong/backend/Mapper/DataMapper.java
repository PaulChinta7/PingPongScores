package com.dev.pingpong.backend.Mapper;

import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.model.Game;
import org.springframework.stereotype.Component;

@Component
public class DataMapper {
    
    public Game MaptoGame(GameRequest gameRequest){
        return Game.builder()
                .player1(gameRequest.getPlayer1())
                .player2(gameRequest.getPlayer2())
                .player1Score(0)
                .player2Score(0)
                .gamePoint(gameRequest.getGamePoint())
                .status("LIVE")
                .build();
    }


    public GameDto MaptoGameDto(Game game) {
        return GameDto.builder()
                .id(game.getId())
                .player1(game.getPlayer1())
                .player2(game.getPlayer2())
                .player1Score(game.getPlayer1Score())
                .player2Score(game.getPlayer2Score())
                .gamePoint(game.getGamePoint())
                .status(game.getStatus())
                .build();
    }
}
