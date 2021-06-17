package com.licenta.socialmedia.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@Getter
@Setter
public class UploadStoryRequest {
    MultipartFile photo;
    String story;
}