package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatRepository extends PagingAndSortingRepository<Chat, Long> {
    @Query(value = "select * from chat c"
            + " where c.user1_id =:id "
            + "or c.user2_id=:id ", nativeQuery = true)
    Page<Chat> findAllByUser1_IdOrUser2_Id(Long id, Pageable pageRequest);
    Chat findByUser1AndUser2(Profile user1, Profile user2);
    @Query(value = "delete socialmedia.chat,socialmedia.chat_message " +
            " from socialmedia.chat " +
            " inner join socialmedia.chat_message  " +
            " where chat_message.chat_id=chat.id " +
            " And socialmedia.chat.id=:id ", nativeQuery = true)
    void deleteChatById(Long id);
}
