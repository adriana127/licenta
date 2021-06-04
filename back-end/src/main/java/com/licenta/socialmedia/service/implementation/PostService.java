package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IPostRepository;
import com.licenta.socialmedia.service.IPostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PostService implements IPostService {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    IPostRepository postRepository;

    @Override
    public Post add(Post post, List<Profile> followers) {
        boolean existing=post.getId()==0;
        post=postRepository.save(post);
        post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
        if(existing)
        for(var profile:followers){
            template.convertAndSend(NotificationEndpoints.POST_CREATED+profile.getUser().getId(), post);
        }
        return post;
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
    public List<Post> getNewsFeedPosts(Long id, List<Profile> following) {
        List<Post> allPosts=(List<Post>)postRepository.findAll();
        List<Post> newsfeed = new ArrayList<>();
        for (var profile:following) {
            var list=allPosts.stream().filter(post -> profile.getUser().getId() == post.getUser().getId()).collect(Collectors.toList());
            newsfeed= Stream.concat(newsfeed.stream(), list.stream())
                    .collect(Collectors.toList());
        }
        newsfeed.forEach(post -> {
            post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
        });

        return newsfeed;
    }

    @Override
    public List<Post> getPersonalPosts(Long id) {
        var newsfeed = (List<Post>) postRepository.findAll();
        return newsfeed.stream().filter(post -> post.getUser().getId() == id).collect(Collectors.toList());
    }
}
