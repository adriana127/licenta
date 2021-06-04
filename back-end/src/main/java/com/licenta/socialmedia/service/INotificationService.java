package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import org.aspectj.weaver.ast.Not;

import java.util.List;
import java.util.Optional;

public interface INotificationService {
    Notification add(Notification notification);

    void delete(Notification notification);

    List<Notification> findPersonalNotifications(Long id);

    Optional<Notification> findById(Long id);

    List<Notification> getAll();
}
