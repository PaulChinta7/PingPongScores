package com.dev.pingpong.backend.controller;


import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/player")
public class PlayerController {
    
    
    @Autowired
    PlayerService playerService;
    
    @GetMapping("/getPlayers")
    public ResponseEntity<List<PlayerDto>> getPlayers(){
        
        return playerService.getPlayers();
    }
    @PostMapping("/addPlayer")
    public ResponseEntity<PlayerDto> addPlayer(@RequestBody PlayerDto playerDto){
        return playerService.addPlayer(playerDto);
    }
    
}
