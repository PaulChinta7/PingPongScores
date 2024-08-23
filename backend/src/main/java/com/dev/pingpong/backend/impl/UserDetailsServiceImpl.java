package com.dev.pingpong.backend.impl;

import com.dev.pingpong.backend.exception.PlayerNotFoundException;
import com.dev.pingpong.backend.model.Player;
import com.dev.pingpong.backend.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    PlayerRepository playerRepository;

    
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Player user=playerRepository.findByName(username);
       if(user==null){
           throw new PlayerNotFoundException("User not found in the database");
       }
        return new UserDetailsImpl(user);
    }

  
}
