package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IChatRepository;
import com.licenta.socialmedia.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService implements IChatService {
    @Autowired
    IChatRepository chatRepository;
    @Override
    public Chat add(Chat user) {
        return chatRepository.save(user);
    }

    @Override
    public void delete(Chat user) {
        chatRepository.delete(user);
    }

    @Override
    public Optional<Chat> findById(Long id) {
        return chatRepository.findById(id);
    }

    @Override
    public Chat findByUsers(Profile user1, Profile user2) {
        return chatRepository.findByUser1AndUser2(user1,user2);
    }

    @Override
    public List<Chat> getAll(Long id,int numberRequest) {
        return chatRepository.findAllByUser1_IdOrUser2_Id(id, PageRequest.of(numberRequest,5)).getContent();
    }
}
