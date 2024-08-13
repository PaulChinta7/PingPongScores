package com.dev.pingpong.backend.service;

import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.exception.GameNotFoundException;
import com.dev.pingpong.backend.model.Game;
import com.dev.pingpong.backend.repository.GameRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameService {
    
    @Autowired
    GameRepository gameRepository;
    @Autowired
    DataMapper dataMapper;
    
    
    public ResponseEntity<List<GameDto>> getGames() {
         List<Game> games=gameRepository.findAll();
         List<GameDto> fetched_games = new ArrayList<>();
         for(Game game:games){
             fetched_games.add(dataMapper.MaptoGameDto(game));
         }
         return new ResponseEntity<>(fetched_games,HttpStatus.OK);
    }
    
    
    public ResponseEntity<String> createGame(GameRequest gameRequest){
        Game game=dataMapper.MaptoGame(gameRequest);
        Game saved_game=gameRepository.save(game);
        return new ResponseEntity<>(saved_game.getId(),HttpStatus.OK);
    }

    public ResponseEntity<Void> increment(String id, String player) {
        Optional<Game> game=gameRepository.findById(id);
        if(game.isPresent()){
            if(player.equals(game.get().getPlayer1()) && game.get().getPlayer1Score()<game.get().getGamePoint()){
                game.get().setPlayer1Score(game.get().getPlayer1Score()+1);
            }
            else if(player.equals(game.get().getPlayer2()) && game.get().getPlayer2Score()<game.get().getGamePoint()){
                game.get().setPlayer2Score(game.get().getPlayer2Score()+1);
            }
            gameRepository.save(game.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            throw new GameNotFoundException("Game not found in the Database with id :"+id);
        }
    }
}
