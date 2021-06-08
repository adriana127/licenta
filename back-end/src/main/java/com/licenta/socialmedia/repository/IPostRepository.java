package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends PagingAndSortingRepository<Post, Long> {
    @Query(value = "select * from post p"
            + " where p.user_id =:id "
            + "order by p.created_on DESC ", nativeQuery = true)
    Page<Post> findAllByUser_Id(Long id, Pageable pageRequest);

    @Query(value = "select * from post p  where p.user_id in :ids " +
            "order by p.created_on DESC ", nativeQuery = true)
    Page<Post> findAllByUserIds(List<Long> ids, Pageable pageabled);
}
