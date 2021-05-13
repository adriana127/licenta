package com.licenta.socialmedia.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@AllArgsConstructor
@Getter
@Setter
public class UpdateProfileRequest {
    String profile;
    Optional<MultipartFile> photo;

}
