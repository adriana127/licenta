package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.LikePostRequest;
import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.LikeService;
import com.licenta.socialmedia.service.implementation.PostService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class LikeController {

    @Autowired
    private final LikeService likeService;
    @Autowired
    private final PostService postService;
    @Autowired
    private final FollowService followService;
    @PostMapping(value = "/like")
    Like like(@RequestBody LikePostRequest model) {
        Like like= likeService.add(model.getLike());
        postService.findById(model.getPostId()).get().getLikes().add(like);
        postService.add(postService.findById(model.getPostId()).get(),followService.getFollowers(like.getUser()));
        return like;
    }

    @PostMapping(value = "/unlike")
    void unlike(@RequestBody LikePostRequest model) {
        postService.findById(model.getPostId()).get()
                .getLikes()
                .removeIf(like -> (like.getUser().getId().equals(model.getLike().getUser().getId())));
        likeService.delete(model.getLike());
    }

    @GetMapping(value = "/likes")
    List<Like> getAllLikes() {
        return likeService.getAll();
    }

}
