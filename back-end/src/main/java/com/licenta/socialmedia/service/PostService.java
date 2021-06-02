package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.repository.IPostRepository;
import com.licenta.socialmedia.service.implementation.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService implements IPostService {
    @Autowired
    IPostRepository postRepository;

    @Override
    public Post add(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void delete(Post user) {

    }

    @Override
    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }

    @Override
    public List<Post> getAll() {
        return (List<Post>) postRepository.findAll();
    }

    @Override
    public List<Post> getNewsFeedPosts(Long id) {
        var newsfeed = (List<Post>) postRepository.findAll();
        return newsfeed.stream().filter(post -> post.getUser().getId() != id).collect(Collectors.toList());
    }

    @Override
    public List<Post> getPersonalPosts(Long id) {
        var newsfeed = (List<Post>) postRepository.findAll();
        return newsfeed.stream().filter(post -> post.getUser().getId() == id).collect(Collectors.toList());
    }
}
