package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Like;

public class LikePostRequest {
    long postId;
    Like like;

    public long getPostId() {
        return postId;
    }

    public void setPostId(long postId) {
        this.postId = postId;
    }

    public Like getLike() {
        return like;
    }

    public void setLike(Like like) {
        this.like = like;
    }


}
