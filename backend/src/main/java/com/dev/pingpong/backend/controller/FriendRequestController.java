package com.dev.pingpong.backend.controller;


import com.dev.pingpong.backend.Mapper.DataMapper;
import com.dev.pingpong.backend.dto.FriendRequestDto;
import com.dev.pingpong.backend.model.FriendRequest;
import com.dev.pingpong.backend.service.FriendRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friendRequest")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendRequestController {
    
    @Autowired
    FriendRequestService friendRequestService;
    
    @PostMapping("/getRequests")
    public ResponseEntity<List<FriendRequestDto>> getRequests(@RequestParam String acceptorId){
        return friendRequestService.getRequests(acceptorId);
    }
    
    @PostMapping("/addFriend")
    public ResponseEntity<Void> addFriendRequest(@RequestBody FriendRequestDto friendRequestDto){
        
        return friendRequestService.addFriendRequest(friendRequestDto);
    }
    
    @PostMapping("/acceptFriend")
    public ResponseEntity<Void> acceptFriend(@RequestParam String friendRequestId){
        return friendRequestService.acceptRequest(friendRequestId);
    }
    
}
