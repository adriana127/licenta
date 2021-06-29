package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Tag;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ITagRepository extends CrudRepository<Tag, Long> {
    @Transactional
    @Modifying
    @Query(value = "delete from socialmedia.post_tags" +
            "            where socialmedia.post_tags.post_id=:id", nativeQuery = true)
    void deleteTagById(Long id);
}