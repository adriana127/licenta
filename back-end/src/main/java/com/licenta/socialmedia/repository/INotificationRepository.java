package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INotificationRepository extends PagingAndSortingRepository<Notification, Long> {

}
