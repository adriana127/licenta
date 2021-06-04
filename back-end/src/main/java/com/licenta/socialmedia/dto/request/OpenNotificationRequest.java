package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Notification;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@Getter
@Setter
public class OpenNotificationRequest {
    List<Notification> notifications;
}
