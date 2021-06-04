package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.repository.INotificationRepository;
import com.licenta.socialmedia.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class NotificationService implements INotificationService {
    @Autowired
    INotificationRepository notificationRepository;
    @Override
    public Notification add(Notification notification) {
        return notificationRepository.save(notification);
    }
    @Override
    public void updateNotifications(List<Notification> notifications) {
         notifications.forEach(notification -> {notificationRepository.save(notification);});
    }
    @Override
    public void delete(Notification notification) {

    }

    @Override
    public List<Notification> findPersonalNotifications(Long id) {
        return ((List<Notification>) notificationRepository
                .findAll()).stream().filter(notification ->notification.getReceiver().getId()==id ).collect(Collectors.toList());
    }

    @Override
    public List<Notification> findNewNotifications(Long id) {
        List<Notification> allnotifications=(List<Notification>)notificationRepository.findAll();
        return allnotifications.stream().filter(notification -> notification.getReceiver().getId()==id&&notification.isState()==true).collect(Collectors.toList());
    }

    @Override
    public Optional<Notification> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Notification> getAll() {
        return (List<Notification>) notificationRepository.findAll();
    }
}
