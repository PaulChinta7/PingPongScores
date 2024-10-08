package com.dev.pingpong.backend.controller;


import com.dev.pingpong.backend.dto.FriendsResponse;
import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.dto.PlayerResponse;
import com.dev.pingpong.backend.dto.PlayerSearchResponse;
import com.dev.pingpong.backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.1.150:3000/"})
public class PlayerController {
    
    
    @Autowired
    PlayerService playerService;
    
    @GetMapping("/getPlayers")
    public ResponseEntity<List<PlayerResponse>> getPlayers(){
        
        return playerService.getPlayers();
    }


    @PostMapping("/getPlayerById")
    public ResponseEntity<PlayerResponse> getPlayerById(@RequestParam String id){
        return playerService.getPlayerById(id);
    }
    @PostMapping("/getFriendsById")
    public ResponseEntity<List<FriendsResponse>> getFriendsById(@RequestParam String id){
        return playerService.getFriendsById(id);
    }
    
    @PostMapping("/addPlayer")
    public ResponseEntity<PlayerDto> addPlayer(@RequestBody PlayerDto playerDto){
        return playerService.addPlayer(playerDto);
    }
    
    @PostMapping("/search")
    public ResponseEntity<List<PlayerSearchResponse>> search(@RequestParam String playerId, @RequestParam String searchTerm){
        return playerService.search(playerId,searchTerm);
    }
    
    
}
