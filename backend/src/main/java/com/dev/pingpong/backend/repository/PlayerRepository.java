package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.model.Player;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends MongoRepository<Player,String> {
}
