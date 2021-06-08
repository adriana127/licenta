package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IPostRepository;
import com.licenta.socialmedia.repository.IUserRepository;
import com.licenta.socialmedia.service.IPostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.licenta.socialmedia.util.NotificationEndpoints.POST_CREATED;

@Service
public class PostService implements IPostService {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    IPostRepository postRepository;
    @Autowired
    IUserRepository userRepository;
    @Override
    public Post add(Post post, List<Profile> followers) {
        boolean existing=post.getId()==0;
        post=postRepository.save(post);
        post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
        if(existing)
        for(var profile:followers){
            template.convertAndSend(POST_CREATED+profile.getUser().getId(), post);
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
    public List<Post> getNewsFeedPosts(Long id, List<Profile> following,int numberOfRequests) {
        List<Long> ids = following.stream().map(Profile->Profile.getUser().getId()).collect(Collectors.toList());
        List<Post> allPosts=postRepository.findAllByUserIds(ids,PageRequest.of(numberOfRequests,4)).getContent();

        allPosts.forEach(post -> {
            post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
        });

        return allPosts;
    }

    @Override
    public List<Post> getPersonalPosts(Long id) {
        Pageable pageable =  PageRequest.of(0 , Integer.MAX_VALUE);
        var newsfeed =  postRepository.findAllByUser_Id(id,pageable).getContent();
        return newsfeed.stream().filter(post -> post.getUser().getId() == id).collect(Collectors.toList());
    }
}
