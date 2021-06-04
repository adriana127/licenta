package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.LikePostRequest;
import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.LikeService;
import com.licenta.socialmedia.service.implementation.NotificationService;
import com.licenta.socialmedia.service.implementation.PostService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    @Autowired
    private final NotificationService notificationService;
    @Autowired
    private SimpMessagingTemplate template;
    @PostMapping(value = "/like")
    Like like(@RequestBody LikePostRequest model) {
        Like like= likeService.add(model.getLike(),postService.findById(model.getPostId()).get());
        postService.findById(model.getPostId()).get().getLikes().add(like);
        postService.add(postService.findById(model.getPostId()).get(),followService.getFollowers(like.getUser()));
        postService.findById(model.getPostId()).get().setPhoto(PhotoUtils.compressBytes(postService.findById(model.getPostId()).get().getPhoto()));
        Notification notification=new Notification(0L,true,like.getUser().getNickname()+" liked your post.",new Date(),like.getUser(),postService.findById(model.getPostId()).get().getUser(),postService.findById(model.getPostId()).get());
        notification=notificationService.add(notification);
        template.convertAndSend(NotificationEndpoints.NOTIFICATION_CREATED+postService.findById(model.getPostId()).get().getUser().getId(), notification);

        return like;
    }

    @PostMapping(value = "/unlike")
    void unlike(@RequestBody LikePostRequest model) {
        postService.findById(model.getPostId()).get()
                .getLikes()
                .removeIf(like -> (like.getUser().getId().equals(model.getLike().getUser().getId())));
        likeService.delete(model.getLike());
    }


}
