package com.dev.pingpong.backend.service;

import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.dto.GameResponse;
import com.dev.pingpong.backend.exception.GameCompletedException;
import com.dev.pingpong.backend.exception.GameNotFoundException;
import com.dev.pingpong.backend.exception.PlayerNotFoundException;
import com.dev.pingpong.backend.model.Game;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.repository.GameRepository;
import com.dev.pingpong.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {
    
    @Autowired
    GameRepository gameRepository;
    @Autowired
    PlayerRepository playerRepository;
    
    @Autowired
    DataMapper dataMapper;
    
    
    public ResponseEntity<List<GameResponse>> getGames() {
         List<Game> games=gameRepository.findAll();
         List<GameResponse> fetched_games = new ArrayList<>();
         
         for(Game game:games){
             System.out.println(game.getPlayer1Id());
             String player1Name=playerRepository.findById(game.getPlayer1Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
             String player2Name=playerRepository.findById(game.getPlayer2Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
             fetched_games.add(GameResponse.builder()
                     .id(game.getId())
                     .player1Id(game.getPlayer1Id())
                     .player1(player1Name)
                     .player1Score(game.getPlayer1Score())
                     .player2Id(game.getPlayer2Id())
                     .player2(player2Name)
                     .player2Score(game.getPlayer2Score())
                     .gamePoint(game.getGamePoint())
                     .status(game.getStatus())
                     .gameDate(game.getGameDate())
                     .build());
         }
        
         return new ResponseEntity<>(fetched_games,HttpStatus.OK);
    }
    
    
    public ResponseEntity<String> createGame(GameRequest gameRequest){
        Game game=dataMapper.MaptoGame(gameRequest);
        Game saved_game=gameRepository.save(game);
        return new ResponseEntity<>(saved_game.getId(),HttpStatus.OK);
    }
    
    public ResponseEntity<Void> increment(String id, String playerId) {
        Optional<Game> game=gameRepository.findById(id);
        if(game.isPresent()){
//          throws exception if player not found in databases
            if(game.get().getStatus().equals("LIVE")) {
                Player player=playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException("Player is not found in the database"));
                if (playerId.equals(game.get().getPlayer1Id()) && game.get().getPlayer1Score() < game.get().getGamePoint()) {
                    game.get().setPlayer1Score(game.get().getPlayer1Score() + 1);

                } else if (playerId.equals(game.get().getPlayer2Id()) && game.get().getPlayer2Score() < game.get().getGamePoint()) {
                    game.get().setPlayer2Score(game.get().getPlayer2Score() + 1);

                }
                if(game.get().getPlayer1Score()==game.get().getPlayer2Score()&& game.get().getPlayer1Score()==game.get().getGamePoint()-1){
                    game.get().setGamePoint(game.get().getGamePoint()+1);
                }
                if(game.get().getPlayer1Score()==game.get().getGamePoint()){
                    game.get().setStatus("COMPLETED");
                    game.get().setWinner(game.get().getPlayer1Id());
                    Player player1=playerRepository.findById(game.get().getPlayer1Id()).get();
                    Player player2=playerRepository.findById(game.get().getPlayer2Id()).get();
                    player1.setGamesWon(player1.getGamesWon()+1);
                    player2.setGamesLost(player2.getGamesLost()+1);
                    playerRepository.save(player1);
                    playerRepository.save(player2);
                   
                }
                else if(  game.get().getPlayer2Score()==game.get().getGamePoint()){
                    game.get().setStatus("COMPLETED");
                    game.get().setWinner(game.get().getPlayer2Id());
                    Player player1=playerRepository.findById(game.get().getPlayer1Id()).get();
                    Player player2=playerRepository.findById(game.get().getPlayer2Id()).get();
                    player2.setGamesWon(player2.getGamesWon()+1);
                    player1.setGamesLost(player1.getGamesLost()+1);
                    playerRepository.save(player1);
                    playerRepository.save(player2);
                
                }
                
                
            }
            else{
                throw new GameCompletedException("Game is complete");
            }
            
            gameRepository.save(game.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            throw new GameNotFoundException("Game not found in the Database with id :"+id);
        }
    }

    public ResponseEntity<List<GameResponse>> getGamesByPlayer(String playerId) {
            List<Game> fetchedGames=gameRepository.findByPlayer(playerId);
        List<GameResponse> mappedGames = new ArrayList<>();

        for(Game game:fetchedGames){
            String player1Name=playerRepository.findById(game.getPlayer1Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
            String player2Name=playerRepository.findById(game.getPlayer2Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
            mappedGames.add(GameResponse.builder()
                    .id(game.getId())
                    .player1Id(game.getPlayer1Id())
                    .player1(player1Name)
                    .player1Score(game.getPlayer1Score())
                    .player2Id(game.getPlayer2Id())
                    .player2(player2Name)
                    .player2Score(game.getPlayer2Score())
                    .gamePoint(game.getGamePoint())
                    .status(game.getStatus())
                            .gameDate(game.getGameDate())
                    .build());
        }
            return new ResponseEntity<>(mappedGames,HttpStatus.OK);
        
    }

    public ResponseEntity<GameResponse> getGamesById(String gameId) {
        Game game=gameRepository.findById(gameId).orElseThrow(()->new GameNotFoundException("Game not found in the database"));
        
        String player1Name=playerRepository.findById(game.getPlayer1Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
        String player2Name=playerRepository.findById(game.getPlayer2Id()).orElseThrow(()-> new PlayerNotFoundException("Player Not found")).getName();
        return new ResponseEntity<>(GameResponse.builder()
                .id(game.getId())
                .player1Id(game.getPlayer1Id())
                .player1(player1Name)
                .player1Score(game.getPlayer1Score())
                .player2Id(game.getPlayer2Id())
                .player2(player2Name)
                .player2Score(game.getPlayer2Score())
                .gamePoint(game.getGamePoint())
                .gameDate(game.getGameDate())
                .status(game.getStatus())
                .build(),HttpStatus.OK);
        



    }

    public List<Game> getLast5GamesByPlayer(String friendId,Integer maxSize) {
        List<Game> records = gameRepository.findByPlayer(friendId);

        // Sort by _id in descending order and limit to the last 5 records
        return records.stream()
                .sorted((e1, e2) -> e2.getId().compareTo(e1.getId())) // Assuming `getId()` returns `_id`
                .limit(maxSize)
                .collect(Collectors.toList());
    }
}
