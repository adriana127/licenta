package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.ChatMessage;
import com.licenta.socialmedia.repository.IChatMessageRepository;
import com.licenta.socialmedia.service.IChatMessageService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@AllArgsConstructor
@Service
public class ChatMessageService implements IChatMessageService {
    @Autowired
    IChatMessageRepository messageRepository;
    @Autowired
    private final SimpMessagingTemplate template;

    @Override
    public ChatMessage add(ChatMessage message) {
        message=messageRepository.save(message);
        template.convertAndSend(NotificationEndpoints.MESSAGE_CREATED+message.getChat().getUser1().getUser().getId().toString(), message);
        template.convertAndSend(NotificationEndpoints.MESSAGE_CREATED+message.getChat().getUser2().getUser().getId().toString(), message);
        return message;
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
    public List<ChatMessage> getAll(Long id, int requestNumber) {
        return messageRepository.findAllByChat_Id(id, PageRequest.of(requestNumber,5)).getContent();
    }

    @Override
    public List<ChatMessage> getLastMessage(Long id) {
        return messageRepository.findAllByChat_Id(id,PageRequest.of(0,5)).getContent();
    }
}
