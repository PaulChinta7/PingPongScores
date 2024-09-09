package com.dev.pingpong.backend.Mapper;

import com.dev.pingpong.backend.dto.*;
import com.dev.pingpong.backend.model.FriendRequest;
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
                .winner("")
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
                .gameDate(game.getGameDate())
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
                .friends(player.getFriends())
                .build();
        
        
    }
    public PlayerResponse MaptoPlayerResponse(Player player) {
        return PlayerResponse.builder().id(player.getId())
                .name(player.getName())
                .email(player.getEmail())
                .gamesWon(player.getGamesWon())
                .gamesLost(player.getGamesLost())
                .friends(player.getFriends())
                .build();


    }
    public PlayerSearchResponse MaptoPlayerSearchResponse(Player player) {
        return PlayerSearchResponse.builder().id(player.getId())
                .name(player.getName())
                .email(player.getEmail())
                .gamesWon(player.getGamesWon())
                .gamesLost(player.getGamesLost())
                .friends(player.getFriends())
                .build();


    }

    public Player MaptoPlayer(PlayerDto playerDto) {
        return Player.builder().id(playerDto.getId())
                .name(playerDto.getName())
                .email(playerDto.getEmail())
                .password(playerDto.getPassword())
                .gamesWon(playerDto.getGamesWon())
                .gamesLost(playerDto.getGamesLost())
                .friends(playerDto.getFriends())
                .build();

    }

    public FriendRequest MaptoFriendRequest(FriendRequestDto friendRequestDto) {
        return FriendRequest.builder()
                .id(friendRequestDto.getId())
                .acceptorId(friendRequestDto.getAcceptorId())
                .requestorId(friendRequestDto.getRequestorId())
                .status(friendRequestDto.getStatus())
                .build();
    }
    public FriendRequestDto MaptoFriendRequestDto(FriendRequest friendRequest) {
        return FriendRequestDto.builder()
                .id(friendRequest.getId())
                .acceptorId(friendRequest.getAcceptorId())
                .requestorId(friendRequest.getRequestorId())
                .status(friendRequest.getStatus())
                .requestDate(friendRequest.getRequestDate())
                .build();
    }

    public FriendsResponse MaptoFriendsResponse(Player player) {
        return FriendsResponse.builder().id(player.getId())
                .name(player.getName())
                .email(player.getEmail())
                .gamesWon(player.getGamesWon())
                .gamesLost(player.getGamesLost())
                .friends(player.getFriends())
                .build();


    }

}
