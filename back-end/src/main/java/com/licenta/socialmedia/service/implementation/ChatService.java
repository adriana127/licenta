package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IChatRepository;
import com.licenta.socialmedia.service.IChatService;
import com.licenta.socialmedia.util.PhotoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService implements IChatService {
    @Autowired
    IChatRepository chatRepository;
    @Autowired
    ProfileService profileService;
    @Autowired
    UserService userService;
    @Override
    public Chat add(Chat user) {
        if(user.getUser1().getPhoto()!=null)
            user.getUser1().setPhoto(PhotoUtils.compressBytes(user.getUser1().getPhoto()));
        if(!user.getUser1().getId().equals(user.getUser2().getId()))
            if(user.getUser2().getPhoto()!=null)
            user.getUser2().setPhoto(PhotoUtils.compressBytes(user.getUser2().getPhoto()));
        user=chatRepository.save(user);
        if(user.getUser1().getPhoto()!=null)
            user.getUser1().setPhoto(PhotoUtils.decompressBytes(user.getUser1().getPhoto()));
        if(!user.getUser1().getId().equals(user.getUser2().getId()))
        if(user.getUser2().getPhoto()!=null)
            user.getUser2().setPhoto(PhotoUtils.decompressBytes(user.getUser2().getPhoto()));
        return user;
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
    public Chat findByUsersUsernames(String user1, String user2) {
        return chatRepository.findByUser1AndUser2(profileService.findByUser(userService.findByUsername(user1).get()),
                profileService.findByUser(userService.findByUsername(user2).get()));
    }
    @Override
    public List<Chat> getAll(Long id,int numberRequest) {
        var chats=chatRepository.findAllByUser1_IdOrUser2_Id(id, PageRequest.of(numberRequest,5)).getContent();
        chats.forEach(message -> {
            if(!message.getUser1().getId().equals(message.getUser2().getId()))
                if(message.getUser1().getPhoto()!=null)
                message.getUser1().setPhoto(PhotoUtils.decompressBytes(message.getUser1().getPhoto()));
            if(!message.getUser1().getId().equals(message.getUser2().getId()))
                if(message.getUser2().getPhoto()!=null)
                     message.getUser2().setPhoto(PhotoUtils.decompressBytes(message.getUser2().getPhoto()));});
        return chats;
    }
}
