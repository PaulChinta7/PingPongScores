package com.dev.pingpong.backend.repository;

import com.dev.pingpong.backend.model.FriendRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends MongoRepository<FriendRequest,String> {

    @Query("{ 'requestorId': ?0, 'acceptorId': ?1 }")
    Optional<FriendRequest> findRequest(String requestorId, String acceptorId);
    @Query("{ 'acceptorId': ?0, 'status': 'PENDING' }")
    List<FriendRequest> findByAcceptorIdPending(String acceptorId);
}
