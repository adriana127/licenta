package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Post;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;

public class UploadPostRequest {
    MultipartFile photo;
    String post;

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }


    public MultipartFile getPhoto() {
        return photo;
    }

    public void setPhoto(MultipartFile photo) {
        this.photo = photo;
    }

}
