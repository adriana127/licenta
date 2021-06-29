package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface INotificationRepository extends PagingAndSortingRepository<Notification, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from socialmedia.notification" +
            "            where socialmedia.notification.post_id=:id", nativeQuery = true)
    void deletePostById(Long id);
}
