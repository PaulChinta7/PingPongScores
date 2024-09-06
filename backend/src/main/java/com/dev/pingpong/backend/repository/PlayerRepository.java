package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.model.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends MongoRepository<Player,String> {
    Player findByName(String username);
    
//    @Query("{ 'email': { $regex: ?0, $options: 'i' } }")
//    List<Player> findByEmail(String searchTerm);
}
