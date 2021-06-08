package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

public interface IPostService {
    Post add(Post user,List<Profile>followers);

    void delete(Post user);

    Optional<Post> findById(Long id);

    List<Post> getAll();

    List<Post> getNewsFeedPosts(Long id, List<Profile> following,int numberOfRequests);

    List<Post> getPersonalPosts(Long id);
}
