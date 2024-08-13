package com.dev.pingpong.backend.controller;


import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.dto.GameRequest;
import com.dev.pingpong.backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @GetMapping("/getGames")
    public ResponseEntity<List<GameDto>> getGames(){
        return gameService.getGames();
    }
    
    @PostMapping("/createGame")
    public ResponseEntity<String> createGame(@RequestBody GameRequest gameRequest){
        return gameService.createGame(gameRequest);
    }
    
    @PostMapping("/increment")
    public ResponseEntity<Void> increment(@RequestParam String id, @RequestParam String player){
        return gameService.increment(id,player);
        
    }
}
