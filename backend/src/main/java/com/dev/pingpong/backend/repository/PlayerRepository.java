package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.model.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends MongoRepository<Player,String> {
    Player findByName(String username);

    Player findByEmail(String username);

    
    @Query("{ 'email': ?0 }")
    Optional<Player> EmailExists(String email);
    
}
