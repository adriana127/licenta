package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.ChatMessage;

import java.util.List;
import java.util.Optional;

public interface IChatMessageService {
    ChatMessage add(ChatMessage user);

    void delete(ChatMessage user);
    void openChat(Long id);
    Optional<ChatMessage> findById(Long id);

    List<ChatMessage> getAll(Long id);
    List<ChatMessage> getLastMessages(Long id, int requestNumber);

}
