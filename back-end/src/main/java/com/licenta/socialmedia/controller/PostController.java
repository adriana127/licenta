package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.PostService;
import com.licenta.socialmedia.service.implementation.UserService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor

public class PostController {

    @Autowired
    private final PostService postService;
    @Autowired
    private final FollowService followService;
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private UserService userService;
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(path = "/createPost",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, "multipart/form-data"})
    public Post createPost(@ModelAttribute UploadPostRequest model) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Post post = objectMapper.readValue(model.getPost(), Post.class);
        post.setPhoto(PhotoUtils.compressBytes(model.getPhoto().getBytes()));
        post= postService.add(post,followService.getFollowers(post.getUser()));

        return  post;
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/updatePost")
    public Post updatePost(@RequestBody Post post) throws Exception {
        var optionalPost = postService.findById(post.getId());
        optionalPost.get().setDescription(post.getDescription());
        optionalPost.get().setTags(post.getTags());
        return postService.add(optionalPost.get(),followService.getFollowers(post.getUser()));
    }
    @GetMapping(value = "/post/{postId}")
    Post postById(@PathVariable Long postId) {
        var response = postService.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        response.setPhoto(PhotoUtils.decompressBytes(response.getPhoto()));
        return response;
    }

    @GetMapping(value = "/posts/newsfeed/{id}/{numberOfRequest}")
    public List<Post> getNewsfeedPosts(@PathVariable ("id") Long id,
                                       @PathVariable ("numberOfRequest") int numberOfRequest) {

        if(!followService.getFollowing(userService.findById(id).get()).isEmpty())
        return postService.getNewsFeedPosts(id,followService.getFollowing(userService.findById(id).get()),numberOfRequest);
        return new ArrayList<>();
    }

    @PostMapping("/deletePost")
    public void deletePost(@RequestBody Post post) throws Exception {
        postService.delete(post);
    }

    @RequestMapping(value = "/personalPosts/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getPersonalPosts(@PathVariable("id") long id) {
        postService.getPersonalPosts(id)
                .forEach(post -> {
                    post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
                });
        return postService.getPersonalPosts(id);
    }
}
