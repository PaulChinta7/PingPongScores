package com.dev.pingpong.backend.controller;

import com.dev.pingpong.backend.dto.JwtResponse;
import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/new")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    
    @Autowired
    PlayerService playerService;
    
    @PostMapping("/login")
    public JwtResponse login(@RequestBody PlayerDto user){
        return playerService.verify(user);
    }

    @PostMapping("/register")
    public ResponseEntity<PlayerDto> register(@RequestBody PlayerDto playerDto){
        return playerService.addPlayer(playerDto);
    }
    
    
}
