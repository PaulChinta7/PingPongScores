package com.dev.pingpong.backend.service;

import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.PlayerDto;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;
    @Autowired
    DataMapper dataMapper;
    public ResponseEntity<List<PlayerDto>> getPlayers() {
        List<Player> fetchedPlayers=playerRepository.findAll();
         
        List<PlayerDto> mappedPlayers=new ArrayList<>();
        for(Player player:fetchedPlayers) mappedPlayers.add(dataMapper.MaptoPlayerDto(player));
        
        return new ResponseEntity<>(mappedPlayers, HttpStatus.OK);
    }

    public ResponseEntity<PlayerDto> addPlayer(PlayerDto playerDto) {
        playerDto.setGamesWon(0);
        playerDto.setGamesLost(0);
        Player player=dataMapper.MaptoPlayer(playerDto);
        Player saved_player=playerRepository.save(player);
        return new ResponseEntity<>(dataMapper.MaptoPlayerDto(saved_player),HttpStatus.OK);
    }
}
