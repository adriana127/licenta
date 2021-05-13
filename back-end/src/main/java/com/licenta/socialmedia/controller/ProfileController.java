package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.service.PostService;
import com.licenta.socialmedia.service.ProfileService;
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

public class ProfileController {

    @Autowired
    private final ProfileService profileService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path="/updateProfile")
    public Profile createPost(@ModelAttribute Profile model) throws Exception {
        return profileService.add(model);
    }

    @RequestMapping(value = "/profile/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Profile getProfileById(@PathVariable("id")long id){
        return profileService.findById(id).get();
}

}
