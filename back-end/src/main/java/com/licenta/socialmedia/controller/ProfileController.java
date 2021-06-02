package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UpdateProfileRequest;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.model.Follow;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.FollowService;
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
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor

public class ProfileController {

    @Autowired
    private final ProfileService profileService;
    @Autowired
    private final UserService userService;
    @Autowired
    private final FollowService followService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/updateProfile",
            consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE, "multipart/form-data"})
    public Profile updateProfileWithPhoto(@ModelAttribute UpdateProfileRequest model) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        Profile profile = objectMapper.readValue(model.getProfile(), Profile.class);
        profile.setPhoto(PhotoUtils.compressBytes(model.getPhoto().get().getBytes()));
        profileService.add(profile);
        userService.updateWithoutPassword(profile.getUser());
        return profile;
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/updateProfile")
    public Profile updateProfileWithoutPhoto(@RequestBody Profile profile) throws Exception {
        var profileWithSamePhoto = profileService.findById(profile.getId());
        profileWithSamePhoto.get().setDescription(profile.getDescription());
        profileWithSamePhoto.get().setDisplayName(profile.getDescription());
        profileWithSamePhoto.get().setUser(profile.getUser());
        userService.updateWithoutPassword(profile.getUser());
        return profileService.add(profileWithSamePhoto.get());
    }

    @RequestMapping(value = "/profile/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Profile getProfileById(@PathVariable("id") long id) {
        Profile profile = profileService.findByUser(userService.findById(id).get());
        if (profile.getPhoto() != null)
            profile.setPhoto(PhotoUtils.decompressBytes(profile.getPhoto()));
        return profile;
    }

    @GetMapping(value = "/profiles")
    List<Profile> getAllPosts() {
        profileService.getAll()
                .forEach(post -> {
                    if (post.getPhoto() != null) post.setPhoto(PhotoUtils.decompressBytes(post.getPhoto()));
                });
        return profileService.getAll();
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/follow")
    public Follow follow(@RequestBody Follow follow) throws Exception {
        return followService.add(follow);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/unfollow")
    public void unfollow(@RequestBody Follow follow) throws Exception {
        followService.delete(follow);
    }

    @RequestMapping(value = "/suggestions/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Profile> getSuggestions(@PathVariable("id") long id) {
        List<Profile> suggestions = followService.getSuggestions(userService.findById(id).get());
        for (Profile suggestion : suggestions) {
            if (suggestion.getPhoto() != null)
                suggestion.setPhoto(PhotoUtils.decompressBytes(suggestion.getPhoto()));
        }
        return suggestions;
    }

    @RequestMapping(value = "/followers/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Profile> getFollowers(@PathVariable("id") long id) {
        List<Profile> suggestions = followService.getFollowers(userService.findById(id).get());
        for (Profile suggestion : suggestions) {
            if (suggestion.getPhoto() != null)
                suggestion.setPhoto(PhotoUtils.decompressBytes(suggestion.getPhoto()));
        }
        return suggestions;
    }

    @RequestMapping(value = "/following/{id}", method = RequestMethod.GET)
    @ResponseBody
    public List<Profile> getFollowing(@PathVariable("id") long id) {
        List<Profile> following = followService.getFollowing(userService.findById(id).get());
        for (Profile profile : following) {
            if (profile.getPhoto() != null)
                profile.setPhoto(PhotoUtils.decompressBytes(profile.getPhoto()));
        }
        return following;
    }
}
