package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.response.MessageResponse;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.implementation.ProfileService;
import com.licenta.socialmedia.service.implementation.UserService;
import com.licenta.socialmedia.util.PhotoUtils;
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
    @RequestMapping(value = "/user/{input}", method = RequestMethod.GET)
    @ResponseBody
    public User searchByUsername(@PathVariable("input") String input) {
        return userService.findByUsername(input).get();
    }
}
