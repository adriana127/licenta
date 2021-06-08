package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.repository.INotificationRepository;
import com.licenta.socialmedia.service.INotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
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
    public List<Notification> findPersonalNotifications(Long id,int numberOfRequests) {
        PageRequest pageable =  PageRequest.of(numberOfRequests,3, Sort.by("createdOn").descending());

        return notificationRepository.findAll( pageable).getContent().stream().filter(notification ->notification.getReceiver().getId()==id ).collect(Collectors.toList());
    }

    @Override
    public List<Notification> findNewNotifications(Long id) {
        PageRequest pageable =PageRequest.of(0,5, Sort.by("createdOn").descending());

        List<Notification> allnotifications= notificationRepository.findAll(pageable).getContent();
        return allnotifications.stream().filter(notification -> notification.getReceiver().getId()==id&&notification.isState()==true).collect(Collectors.toList());
    }

    @Override
    public Optional<Notification> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Notification> getAll() {
        PageRequest pageable = PageRequest.of(0,5, Sort.by("createdOn").descending());
        return  notificationRepository.findAll(pageable).getContent();
    }
}
