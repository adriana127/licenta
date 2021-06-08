package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatRepository extends PagingAndSortingRepository<Chat, Long> {
    @Query(value = "select * from chat"
            + " where user1_id =:id "
            + "or user2_id=:id "
            + "order by created_on DESC ", nativeQuery = true)
    Page<Chat> findAllByUser1_IdOrUser2_Id(Long id, Pageable pageRequest);
    Chat findByUser1AndUser2(Profile user1, Profile user2);
}
