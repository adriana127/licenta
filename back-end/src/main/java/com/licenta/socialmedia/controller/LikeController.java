package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.service.LikeService;
import com.licenta.socialmedia.service.PostService;
import lombok.AllArgsConstructor;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
@CrossOrigin(origins ="http://localhost:4200")
@AllArgsConstructor

public class LikeController {

    @Autowired
    private final LikeService likeService;

    @PostMapping(value = "/like")
    Like like(@RequestBody Like model) {
        System.out.printf(model.toString());
        return likeService.add(model);
    }
    @PostMapping(value = "/unlike")
    void unlike(@RequestBody Like model) {
        likeService.delete(model);
    }
    @GetMapping(value = "/likes")
    List<Like> getAllLikes() {
        return likeService.getAll();
    }

}
