package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStoryRepository extends PagingAndSortingRepository<Story, Long> {
    @Query(value = "select * from socialmedia.story s " +
            "WHERE NOT EXISTS " +
            "(" +
            "SELECT * FROM socialmedia.story_followers sf " +
            "where s.id=sf.story_id " +
            "AND sf.followers_id=:followerId " +
            "AND s.user_id=:userId " +
            "order by s.created_on DESC", nativeQuery = true)
    Optional<Page<Story>> findAllByUser_IdnAndAndFollowers_Id(Long userId, Long followerId, Pageable pageRequest);
}
