package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Notification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INotificationRepository extends CrudRepository<Notification, Long> {
}
