package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class CommentPostRequest {
    long postId;
    Comment comment;
}
