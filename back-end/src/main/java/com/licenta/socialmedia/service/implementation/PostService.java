package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.repository.IPostRepository;
import com.licenta.socialmedia.service.IPostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService implements IPostService {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    IPostRepository postRepository;

    @Override
    public Post add(Post newPost,List<Profile>followers) {
        newPost= postRepository.save(newPost);
        var newsfeed = (List<Post>) postRepository.findAll();
        newsfeed.forEach(value->{value.setPhoto(PhotoUtils.decompressBytes(value.getPhoto()));});
        Post finalNewPost = newPost;
      // newsfeed= newsfeed.stream().filter(post -> post.getUser().getId() != finalNewPost.getUser().getId()).collect(Collectors.toList());

        for (var follower:followers) {
            template.convertAndSend(NotificationEndpoints.NEWSFEED +follower.getUser().getId(),
                    newsfeed);
        }
        return newPost;
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
        newsfeed.forEach(post->{post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));});
template.convertAndSend(NotificationEndpoints.NEWSFEED +id,
                newsfeed.stream().filter(post -> post.getUser().getId() != id).collect(Collectors.toList()));
        return newsfeed.stream().filter(post -> post.getUser().getId() != id).collect(Collectors.toList());
    }

    @Override
    public List<Post> getPersonalPosts(Long id) {
        var newsfeed = (List<Post>) postRepository.findAll();
        return newsfeed.stream().filter(post -> post.getUser().getId() == id).collect(Collectors.toList());
    }
}
