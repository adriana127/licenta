package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.ChatMessage;
import com.licenta.socialmedia.service.implementation.ChatMessageService;
import com.licenta.socialmedia.service.implementation.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class ChatController {
    @Autowired
    private final ChatService chatService;
    @Autowired
    private final ChatMessageService chatMessageService;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/createChat")
    public Chat createChat(@RequestBody Chat chat) throws Exception {
        var result = chatService.findByUsers(chat.getUser1(), chat.getUser2());
        if (result != null)
            return result;
        else {
            result = chatService.findByUsers(chat.getUser2(), chat.getUser1());
            if (result != null)
                return result;
        }
        return chatService.add(chat);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/updateChat")
    public Chat updateChat(@RequestBody Chat chat) throws Exception {
        return chatService.add(chat);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/createChatMessage")
    public ChatMessage createChatMessage(@RequestBody ChatMessage chatMessage) throws Exception {
        return chatMessageService.add(chatMessage);
    }

    @GetMapping(value = "/chat")
    Chat postById(@RequestBody Chat chat) {
        return chatService.findByUsers(chat.getUser1(), chat.getUser2());
    }

    @SubscribeMapping(value = "/chatMessages/get/{id}/{requestNumber}")
    List<ChatMessage> getChatMessages(@DestinationVariable Long id,
                               @DestinationVariable int requestNumber) {
        return chatMessageService.getAll(id, requestNumber);
    }

    @GetMapping(value = "/chat/getLastMessage/{id}")
    ChatMessage getLastChatMessages(@PathVariable Long id) {
        var a=chatMessageService.getLastMessage(id);
        return a.get(0);
    }

    @SubscribeMapping(value = "/chat/{id}/{requestNumber}")
    List<Chat> getUserChats(@DestinationVariable Long id,
                            @DestinationVariable int requestNumber) {
        return chatService.getAll(id, requestNumber);
    }
}
