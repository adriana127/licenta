package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.CommentPostRequest;
import com.licenta.socialmedia.dto.request.LikePostRequest;
import com.licenta.socialmedia.model.Comment;
import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.CommentService;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.LikeService;
import com.licenta.socialmedia.service.implementation.PostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CommentController {
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private final CommentService commentService;
    @Autowired
    private final PostService postService;
    @Autowired
    private final FollowService followService;
    @PostMapping(value = "/addComment")
    Comment addComment(@RequestBody CommentPostRequest model) {
        Comment comment= commentService.add(model.getComment());
        postService.findById(model.getPostId()).get().getComments().add(comment);
        postService.add(postService.findById(model.getPostId()).get(),followService.getFollowers(comment.getUser()));
        template.convertAndSend(NotificationEndpoints.COMMENT_CREATED+model.getPostId(), comment);
        return comment;
    }

    @PostMapping(value = "/deleteComment")
    void deleteComment(@RequestBody CommentPostRequest model) {
        postService.findById(model.getPostId()).get()
                .getComments()
                .removeIf(like -> (like.getUser().getId().equals(model.getComment().getUser().getId())));
        commentService.delete(model.getComment());
    }
    @SubscribeMapping(value = "/comments/get/{id}")
    public Set<Comment> getNewsfeedPosts(@DestinationVariable("id") long id) {
        Post post=postService.findById(id).get();
        return  postService.findById(id).get().getComments();
    }

}
