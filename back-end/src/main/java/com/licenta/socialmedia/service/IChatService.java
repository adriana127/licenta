package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;

import java.util.List;
import java.util.Optional;

public interface IChatService {
    Chat add(Chat user);

    void delete(Chat user);

    Optional<Chat> findById(Long id);
    Chat findByUsers(Profile user1, Profile user2);
    Chat findByUsersUsernames(String user1, String user2);

    List<Chat> getAll(Long id,int numberRequest);

}
