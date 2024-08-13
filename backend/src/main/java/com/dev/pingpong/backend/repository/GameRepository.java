package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<Game,String> {
}
