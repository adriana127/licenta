package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.ChatMessage;
import com.licenta.socialmedia.repository.IChatMessageRepository;
import com.licenta.socialmedia.service.IChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatMessageService implements IChatMessageService {
    @Autowired
    IChatMessageRepository messageRepository;
    @Override
    public ChatMessage add(ChatMessage user) {
        return messageRepository.save(user);
    }

    @Override
    public void delete(ChatMessage user) {
        messageRepository.delete(user);
    }

    @Override
    public Optional<ChatMessage> findById(Long id) {
        return messageRepository.findById(id);
    }

    @Override
    public List<ChatMessage> getAll(Long id,int requestNumber) {
        return messageRepository.findAllByChat_Id(id, PageRequest.of(requestNumber,20)).getContent();
    }
}
