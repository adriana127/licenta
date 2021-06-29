package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.CommentPostRequest;
import com.licenta.socialmedia.model.Comment;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.CommentService;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.NotificationService;
import com.licenta.socialmedia.service.implementation.PostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CommentController {
    @Autowired
    private final CommentService commentService;
    @Autowired
    private final PostService postService;
    @Autowired
    private final FollowService followService;
    @Autowired
    private final NotificationService notificationService;
    @Autowired
    private final SimpMessagingTemplate template;

    @PostMapping(value = "/addComment")
    Comment addComment(@RequestBody CommentPostRequest model) {
        Comment comment = commentService.add(model.getComment());
        Post post = postService.findById(model.getPostId()).get();

        post.getComments().add(comment);
        postService.add(post, followService.getFollowers(comment.getUser()));
        template.convertAndSend(NotificationEndpoints.COMMENT_CREATED + model.getPostId(), comment);
        post.setPhoto(PhotoUtils.compressBytes(post.getPhoto()));

        Notification notification = new Notification(0L, true, comment.getUser().getNickname() + " comment your post.", new Date(), comment.getUser(), postService.findById(model.getPostId()).get().getUser(), postService.findById(model.getPostId()).get());
        notification = notificationService.add(notification);

        template.convertAndSend(NotificationEndpoints.NOTIFICATION_CREATED + post.getUser().getId(), notification);

        return comment;
    }

    @PostMapping(value = "/deleteComment")
    void deleteComment(@RequestBody CommentPostRequest model) {
        var post=postService.findById(model.getPostId()).get();
        post.getComments()
                .removeIf(comment -> (comment.getId().equals(model.getComment().getId())));
        commentService.delete(model.getComment());
    }

    @SubscribeMapping(value = "/comments/get/{id}")
    public Set<Comment> getNewsfeedPosts(@DestinationVariable("id") long id) {
        Post post = postService.findById(id).get();
        return postService.findById(id).get().getComments();
    }

}
