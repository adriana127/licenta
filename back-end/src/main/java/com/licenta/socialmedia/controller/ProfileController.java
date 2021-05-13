package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UpdateProfileRequest;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.PostService;
import com.licenta.socialmedia.service.ProfileService;
import com.licenta.socialmedia.service.UserService;
import com.licenta.socialmedia.util.PhotoUtils;
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
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
@CrossOrigin(origins ="http://localhost:4200")
@AllArgsConstructor

public class ProfileController {

    @Autowired
    private final ProfileService profileService;
    @Autowired
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path="/updateProfile",
                consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, "multipart/form-data"})
    public Profile updateProfileWithPhoto(@ModelAttribute UpdateProfileRequest model) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Profile profile =objectMapper.readValue(model.getProfile(),Profile.class) ;
        if(!model.getPhoto().equals(Optional.empty())){
        profile.setPhoto(PhotoUtils.compressBytes(model.getPhoto().get().getBytes()));}
        profileService.add(profile);
        return profile;
    }


    @RequestMapping(value = "/profile/{id}",method = RequestMethod.GET)
    @ResponseBody
    public Profile getProfileById(@PathVariable("id")long id){

        Profile profile=profileService.findByUser(userService.findById(id).get());
        if(!profile.getPhoto().equals(Optional.empty())){
            profile.setPhoto(PhotoUtils.decompressBytes(profile.getPhoto()));}
        return profile;
    }

}
