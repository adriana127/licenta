package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatMessageRepository extends PagingAndSortingRepository<ChatMessage, Long> {
    @Query(value = "select * from chat_message c"
            + " where c.chat_id =:id "
            + "order by c.created_on DESC ", nativeQuery = true)
    Page<ChatMessage> findAllByChat_Id(Long id, Pageable pageRequest);

}
