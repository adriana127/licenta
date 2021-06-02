package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Comment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICommentRepository extends CrudRepository<Comment, Long> {
}
