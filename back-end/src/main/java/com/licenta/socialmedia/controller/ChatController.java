package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.ChatMessage;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.ChatMessageService;
import com.licenta.socialmedia.service.implementation.ChatService;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class ChatController {
    @Autowired
    private final SimpMessagingTemplate template;
    @Autowired
    private final ChatService chatService;
    @Autowired
    private final ChatMessageService chatMessageService;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/createChat")
    public Chat createChat(@RequestBody Chat chat) throws Exception {
        var result=chatService.findByUsers(chat.getUser1(),chat.getUser2());
        if(result!=null)
            return result;
        return  chatService.add(chat);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/createChatMessage")
    public ChatMessage createChatMessage(@RequestBody ChatMessage chatMessage) throws Exception {
        return  chatMessageService.add(chatMessage);
    }

    @GetMapping(value = "/chat")
    Chat postById(@RequestBody Chat chat) {
        return chatService.findByUsers(chat.getUser1(),chat.getUser2());
    }

    @GetMapping(value = "/chatMessages/{id}/{requestNumber}")
    List<ChatMessage> postById(@PathVariable Long id,
                               @PathVariable int requestNumber) {
        return chatMessageService.getAll(id,requestNumber);
    }
}
