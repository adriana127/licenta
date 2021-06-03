package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Comment;
import com.licenta.socialmedia.model.Like;

import java.util.List;
import java.util.Optional;

public interface ICommentService {
    Comment add(Comment user);

    void delete(Comment user);

    Optional<Comment> findById(Long id);

    List<Comment> getAll();
}
