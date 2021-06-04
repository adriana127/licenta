package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.INotificationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class NotificationController {
    @Autowired
    INotificationService notificationService;
    @SubscribeMapping(value = "/notifications/get/{id}")
    public List<Notification> getNotifications(@DestinationVariable("id") long id) {
        return notificationService.findPersonalNotifications(id);
    }
}
