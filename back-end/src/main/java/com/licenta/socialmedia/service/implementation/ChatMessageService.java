package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.ChatMessage;
import com.licenta.socialmedia.repository.IChatMessageRepository;
import com.licenta.socialmedia.service.IChatMessageService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
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
        if(message.getSender().getPhoto()!=null)
            message.getSender().setPhoto(PhotoUtils.compressBytes(message.getSender().getPhoto()));
        message=messageRepository.save(message);
        if(message.getSender().getPhoto()!=null)
            message.getSender().setPhoto(PhotoUtils.decompressBytes( message.getSender().getPhoto()));
        template.convertAndSend(NotificationEndpoints.MESSAGE_CREATED+message.getChat().getUser1().getUser().getId().toString(), message);
        if(message.getChat().getUser1().getUser().getId()!=message.getChat().getUser2().getUser().getId())
            template.convertAndSend(NotificationEndpoints.MESSAGE_CREATED+message.getChat().getUser2().getUser().getId().toString(), message);
        return message;
    }

    @Override
    public void delete(ChatMessage user) {
        messageRepository.delete(user);
    }

    @Override
    public void openChat(Long id) {
        getAll(id).forEach(message -> {
            message.setState(true);
            messageRepository.save(message);
        });
    }

    @Override
    public Optional<ChatMessage> findById(Long id) {
        return messageRepository.findById(id);
    }

    @Override
    public List<ChatMessage> getAll(Long id) {
        var messages=messageRepository.findAllByChat_Id(id, PageRequest.of(0,Integer.MAX_VALUE)).getContent();

        return messages;
    }

    @Override
    public List<ChatMessage> getLastMessages(Long id, int requestNumber) {
        var messages=messageRepository.findAllByChat_Id(id,PageRequest.of(requestNumber,5)).getContent();

        return messages;
    }
}
