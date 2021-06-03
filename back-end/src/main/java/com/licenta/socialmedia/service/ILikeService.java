package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Like;

import java.util.List;
import java.util.Optional;

public interface ILikeService {
    Like add(Like user);

    void delete(Like user);

    Optional<Like> findById(Long id);

    List<Like> getAll();
}
