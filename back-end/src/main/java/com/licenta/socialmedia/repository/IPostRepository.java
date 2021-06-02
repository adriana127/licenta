package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPostRepository extends CrudRepository<Post, Long> {
}
