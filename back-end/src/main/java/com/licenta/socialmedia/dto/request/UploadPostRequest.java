package com.licenta.socialmedia.dto.request;

import com.licenta.socialmedia.model.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
@Setter
public class UploadPostRequest {
    MultipartFile photo;
    String post;
}
