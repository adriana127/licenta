package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;

import java.util.List;
import java.util.Optional;

public interface ILikeService {

    Like add(Like like, Post post);

    void delete(Like user);

    Optional<Like> findById(Long id);

    List<Like> getAll();
}
