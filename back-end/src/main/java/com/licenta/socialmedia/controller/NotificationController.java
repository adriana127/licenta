package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.OpenNotificationRequest;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.service.implementation.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class NotificationController {
    @Autowired
    private final NotificationService notificationService;

    @SubscribeMapping(value = "/notifications/get/{id}/{numberOfRequests}")
    public List<Notification> getNotifications(@DestinationVariable("id") long id,
                                               @DestinationVariable("numberOfRequests") int numberOfRequests) {
        return notificationService.findPersonalNotifications(id,numberOfRequests);
    }

    @SubscribeMapping(value = "/notifications/new/{id}")
    public List<Notification> getNewNotifications(@DestinationVariable("id") long id) {
        return notificationService.findNewNotifications(id);
    }

    @PostMapping(value = "/openNotifications")
    void openNotifications(@RequestBody Notification[] notifications) {
        if (notifications.length==0)
            return;
        Arrays.stream(notifications).forEach(notification -> {
            notification.setState(false);
        });
        notificationService.updateNotifications(Arrays.asList(notifications));
    }
}
