package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Like;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class LikePostRequest {
    long postId;
    Like like;
}
