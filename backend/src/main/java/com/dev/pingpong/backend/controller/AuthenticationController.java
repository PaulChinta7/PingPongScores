package com.dev.pingpong.backend.controller;

import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/new")
public class AuthenticationController {
    
    @Autowired
    PlayerService playerService;
    
    @PostMapping("/login")
    public String login(@RequestBody PlayerDto user){
        return playerService.verify(user);
    }

    @PostMapping("/register")
    public String register() {
        return "registration success";
    }
    
    
}
