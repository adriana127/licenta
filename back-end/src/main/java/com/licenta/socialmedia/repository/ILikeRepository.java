package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Like;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ILikeRepository extends CrudRepository<Like, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from socialmedia.post_likes" +
            "            where socialmedia.post_likes.post_id=:id", nativeQuery = true)
    void deleteLikeById(Long id);
}
