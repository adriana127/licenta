package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.response.MessageResponse;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.ProfileService;
import com.licenta.socialmedia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor

public class UserController {
    @Autowired
    private final UserService userService;

    @Autowired
    private final ProfileService profileService;

    @GetMapping(value = "/users")
    List<User> getAllPosts() {
        return userService.getAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) throws Exception {
        return userService.add(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/deleteUser")
    public void deleteUser(@RequestBody User user) throws Exception {
        userService.delete(user);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    public MessageResponse register(@RequestBody User user) throws Exception {
        System.out.printf(user.toString());

        if(!userService.findByUsername(user.getUsername()).equals(Optional.empty()))
           return new MessageResponse(409,"User already exists!",null);
        else{
                User newUser=userService.add(user);
                Profile profile = new Profile();
                profile.setUser(newUser);
                profileService.add(profile);
            return new MessageResponse(201,"Successfully registered!",newUser);
        }
    }
}
