package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.UpdateProfileRequest;
import com.licenta.socialmedia.model.Follow;
import com.licenta.socialmedia.model.Notification;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.service.implementation.FollowService;
import com.licenta.socialmedia.service.implementation.NotificationService;
import com.licenta.socialmedia.service.implementation.ProfileService;
import com.licenta.socialmedia.service.implementation.UserService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


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
    @Autowired
    private final NotificationService notificationService;
    @Autowired
    private SimpMessagingTemplate template;

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
        Notification notification=new Notification(0L,true,follow.getFollower().getNickname()+" liked your post.",new Date(),follow.getFollower(),follow.getFollowed(),null);
        notification=notificationService.add(notification);
        template.convertAndSend(NotificationEndpoints.NOTIFICATION_CREATED+follow.getFollowed().getId(), notification);

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
