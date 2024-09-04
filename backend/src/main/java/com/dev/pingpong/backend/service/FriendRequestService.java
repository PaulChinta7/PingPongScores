package com.dev.pingpong.backend.service;


import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.FriendRequestDto;
import com.dev.pingpong.backend.exception.FriendRequestAlreadySent;
import com.dev.pingpong.backend.exception.FriendRequestNotFound;
import com.dev.pingpong.backend.exception.PlayerNotFoundException;
import com.dev.pingpong.backend.model.FriendRequest;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.repository.FriendRequestRepository;
import com.dev.pingpong.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FriendRequestService {
    
    
    @Autowired
    FriendRequestRepository friendRequestRepository;
    @Autowired
    PlayerRepository playerRepository;
    
    @Autowired
    DataMapper dataMapper;
    


    public ResponseEntity<Void> addFriendRequest(FriendRequestDto friendRequestDto) {
//        if friend request already there you dont send one more request.
        Optional<FriendRequest> request=friendRequestRepository.findRequest(
                friendRequestDto.getRequestorId(),
                friendRequestDto.getAcceptorId());
        if(request.isPresent()) {
            throw new FriendRequestAlreadySent("Friend Request already sent");
        }
//        creating a friend request and adding into the db table with pending.
        else{
        FriendRequest friendRequest=dataMapper.MaptoFriendRequest(friendRequestDto);
        friendRequest.setStatus("PENDING");
        FriendRequest saved_friendRequest=friendRequestRepository.save((friendRequest));
        return new ResponseEntity<>(HttpStatus.OK);
            
        }
    }


    public ResponseEntity<List<FriendRequestDto>> getRequests(String acceptorId) {
        List<FriendRequest> friendRequests=friendRequestRepository.findByAcceptorIdPending(acceptorId);
        List<FriendRequestDto> mapped_friendRequests=new ArrayList<>();
        for(FriendRequest friendRequest: friendRequests){
            String requestorName=playerRepository.findById(friendRequest.getRequestorId()).get().getName();
            FriendRequestDto obj=dataMapper.MaptoFriendRequestDto(friendRequest);
            obj.setRequestorName(requestorName);
            mapped_friendRequests.add(obj);
        }
        return new ResponseEntity<>(mapped_friendRequests,HttpStatus.OK);
        
    }
    
    public ResponseEntity<Void> acceptRequest(String friendRequestId){
        FriendRequest friendRequest=friendRequestRepository.findById(friendRequestId)
                .orElseThrow(()->new FriendRequestNotFound("Friend Request not found in the database"));
        friendRequest.setStatus("ACCEPTED");
        Player player=playerRepository.findById(friendRequest.getAcceptorId())
                .orElseThrow(()->new PlayerNotFoundException("Player Not found in the database"));
        player.getFriends().add(friendRequest.getRequestorId());
        Player playerReq=playerRepository.findById(friendRequest.getRequestorId())
                .orElseThrow(()->new PlayerNotFoundException("Player Not found in the database"));
        playerReq.getFriends().add(friendRequest.getAcceptorId());
        friendRequestRepository.save(friendRequest);
      
        playerRepository.save(player);
        playerRepository.save(playerReq);
        return new ResponseEntity<>(HttpStatus.OK);
        
    }
}
