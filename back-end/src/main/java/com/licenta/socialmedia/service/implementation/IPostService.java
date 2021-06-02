package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;

import java.util.List;
import java.util.Optional;

public interface IPostService {
    Post add(Post user);
    void delete(Post user);
    Optional<Post> findById(Long id);
    List<Post> getAll();
    List<Post> getNewsFeedPosts(Long id);

    List<Post> getPersonalPosts(Long id);
}
