package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.PostService;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor

public class PostController {

    @Autowired
    private final PostService postService;
    @Autowired
    private final FollowService followService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/createPost",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, "multipart/form-data"})
    public Post createPost(@ModelAttribute UploadPostRequest model) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Post post = objectMapper.readValue(model.getPost(), Post.class);
        post.setPhoto(PhotoUtils.compressBytes(model.getPhoto().getBytes()));
        return postService.add(post,followService.getFollowers(post.getUser()));
    }

    @GetMapping(value = "/post/{postId}")
    Post postById(@PathVariable Long postId) {
        var response = postService.findById(postId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        response.setPhoto(PhotoUtils.decompressBytes(response.getPhoto()));
        return response;
    }

    @GetMapping(value = "/posts")
    List<Post> getAllPosts() {
        postService.getAll()
                .forEach(post -> {
                    post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
                });
        return postService.getAll();
    }

    @RequestMapping(value = "/newsfeed/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Post> getNewsfeedPosts(@PathVariable("id") long id) {

        return postService.getNewsFeedPosts(id);
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
