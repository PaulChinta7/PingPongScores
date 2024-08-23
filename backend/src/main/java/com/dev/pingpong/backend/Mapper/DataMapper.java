package com.dev.pingpong.backend.Mapper;

import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.model.Game;
import com.dev.pingpong.backend.model.Player;
import org.springframework.stereotype.Component;

@Component
public class DataMapper {
    public Game MaptoGame(GameRequest gameRequest){
        return Game.builder()
                .player1Id(gameRequest.getPlayer1Id())
                .player2Id(gameRequest.getPlayer2Id())
                .player1Score(0)
                .player2Score(0)
                .gamePoint(gameRequest.getGamePoint())
                .status("LIVE")
                .build();
    }


    public GameDto MaptoGameDto(Game game) {
        return GameDto.builder()
                .id(game.getId())
                .player1Id(game.getPlayer1Id())
                .player2Id(game.getPlayer2Id())
                .player1Score(0)
                .player2Score(0)
                .gamePoint(game.getGamePoint())
                .status("LIVE")
                .build();
    }

    public PlayerDto MaptoPlayerDto(Player player) {
        return PlayerDto.builder().id(player.getId())
                .name(player.getName())
                .email(player.getEmail())
                .password(player.getPassword())
                .gamesWon(player.getGamesWon())
                .gamesLost(player.getGamesLost())
                .build();
        
        
    }

    public Player MaptoPlayer(PlayerDto playerDto) {
        return Player.builder().id(playerDto.getId())
                .name(playerDto.getName())
                .email(playerDto.getEmail())
                .password(playerDto.getPassword())
                .gamesWon(playerDto.getGamesWon())
                .gamesLost(playerDto.getGamesLost())
                .build();

    }
}
