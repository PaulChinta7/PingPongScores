package com.dev.pingpong.backend.service;

import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.*;
import com.dev.pingpong.backend.exception.PlayerNotFoundException;
import com.dev.pingpong.backend.model.Game;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    GameService gameService;
    
    private  BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder(10);

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JWTService jwtService;
    @Autowired
    DataMapper dataMapper;
    public ResponseEntity<List<PlayerResponse>> getPlayers() {
        List<Player> fetchedPlayers=playerRepository.findAll();
        List<PlayerResponse> mappedPlayers=new ArrayList<>();
        for(Player player:fetchedPlayers) mappedPlayers.add(dataMapper.MaptoPlayerResponse(player));
        
        return new ResponseEntity<>(mappedPlayers, HttpStatus.OK);
    }
    
    
//    shouldnt allow duplicate users
    public ResponseEntity<PlayerDto> addPlayer(PlayerDto playerDto) {
        playerDto.setGamesWon(0);
        playerDto.setGamesLost(0);
        playerDto.setFriends(new ArrayList<>());
        playerDto.setPassword(bCryptPasswordEncoder.encode(playerDto.getPassword()));
        Player player=dataMapper.MaptoPlayer(playerDto);
        Player saved_player=playerRepository.save(player);
        return new ResponseEntity<>(dataMapper.MaptoPlayerDto(saved_player),HttpStatus.OK);
    }

    public JwtResponse verify(PlayerDto user) {
        
        Authentication authentication=
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getName()
                                ,user.getPassword()));
        if( authentication.isAuthenticated()){
            return JwtResponse.builder()
                    .token(jwtService.generateToken(user.getName()))
                    .id(playerRepository.findByName(user.getName()).getId())
                    .status(207).build();
        }
        else{
            return JwtResponse.builder()
                    .token("")
                    .id("")
                    .status(401).build();

        }
    }

    public ResponseEntity<PlayerResponse> getPlayerById(String id) {
        Player fetched_player=playerRepository.findById(id)
                .orElseThrow(()->new PlayerNotFoundException("Player Not found in the database"));
        PlayerResponse mapped_playerResponse=dataMapper.MaptoPlayerResponse(fetched_player);
        List<GameResponse> fetched_games=gameService.getGamesByPlayer(id).getBody();
        mapped_playerResponse.setGames(fetched_games);
        return new ResponseEntity<>(mapped_playerResponse,HttpStatus.OK);
    }
    
    public ResponseEntity<List<FriendsResponse>> getFriendsById(String id){
        Player fetched_player=playerRepository.findById(id)
                .orElseThrow(()->new PlayerNotFoundException("Player Not found in the database"));
        List<FriendsResponse> friends=new ArrayList<>();
        for(String friend_id: fetched_player.getFriends()){
            List<Integer> last5=calculateLast5(friend_id);
            FriendsResponse friendsResponse=dataMapper.MaptoFriendsResponse(playerRepository.findById(friend_id).get());
            friendsResponse.setLast5(last5);
            friends.add(friendsResponse);
        }
        return new ResponseEntity<>(friends,HttpStatus.OK);
        
    }

    private List<Integer> calculateLast5(String friendId) {
        List<Game> fetched_games=gameService.getLast5GamesByPlayer(friendId);
        List<Integer> last5=new ArrayList<>();
        for(Game game :fetched_games){
            if(game.getWinner().equals(friendId)){
                last5.add(1);
            }
            else{
                last5.add(0);
            }
        }
        while(last5.toArray().length<5){
            last5.add(-1);
        }
        return last5;
    }
    public ResponseEntity<List<PlayerResponse>> search(String playerId,String searchTerm){
        List <String> friends=playerRepository.findById(playerId).get().getFriends();
        List<Player> players=playerRepository.findAll();
        List<PlayerResponse> result=new ArrayList<>();
        for(Player player :players){
            if(!friends.contains(player.getId())) {
                if(!player.getId().equals(playerId)){
                result.add(dataMapper.MaptoPlayerResponse(player));
                }
            }
            
        }
        
        return new ResponseEntity<>(result,HttpStatus.OK);
        
    }
    

}
