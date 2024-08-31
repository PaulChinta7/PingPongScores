package com.dev.pingpong.backend.controller;


import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.dto.GameResponse;
import com.dev.pingpong.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @GetMapping("/getGames")
    public ResponseEntity<List<GameResponse>> getGames(){
        return gameService.getGames();
    }
    
    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody GameRequest gameRequest){
        return gameService.createGame(gameRequest);
    }
    
    @PostMapping("/increment")
    public ResponseEntity<Void> increment(@RequestParam String id, @RequestParam String playerId){
        return gameService.increment(id,playerId);
    }
    
    @PostMapping("/getGamesByPlayer")
    public ResponseEntity<List<GameResponse>> getGamesByPlayer(@RequestParam String playerId){
        return gameService.getGamesByPlayer(playerId);
        
        
    }

    @PostMapping("/getGamesById")
    public ResponseEntity<GameResponse> getGamesById(@RequestParam String gameId){
        return gameService.getGamesById(gameId);
    }
    
}
