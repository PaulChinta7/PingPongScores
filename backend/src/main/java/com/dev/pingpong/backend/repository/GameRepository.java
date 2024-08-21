package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.dto.GameDto;
import com.dev.pingpong.backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends MongoRepository<Game,String> {

    @Query("{ '$or': [ { 'player1Id': ?0 }, { 'player2Id': ?0 } ] }")
    List<Game> findByPlayer(String playerId);
}
