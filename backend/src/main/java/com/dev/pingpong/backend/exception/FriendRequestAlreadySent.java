package com.dev.pingpong.backend.exception;

public class FriendRequestAlreadySent extends RuntimeException {
    public FriendRequestAlreadySent(String friendRequestAlreadySent) {
        super(friendRequestAlreadySent);
    }
}
