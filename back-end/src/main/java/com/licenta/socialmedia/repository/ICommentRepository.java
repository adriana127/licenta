package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Comment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ICommentRepository extends CrudRepository<Comment, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from socialmedia.post_comments" +
            "            where socialmedia.post_comments.post_id=:id", nativeQuery = true)
    void deleteCommentByPostId(Long id);

}
