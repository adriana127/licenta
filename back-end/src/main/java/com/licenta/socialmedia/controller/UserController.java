package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.response.MessageResponse;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor

public class UserController {
    @Autowired
    private final UserService userService;

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
    @PostMapping("/login")
    public MessageResponse login(@RequestBody User user) throws Exception {
        if(userService.findByEmail(user.getEmail()).equals(Optional.empty()))
        return new MessageResponse(404,"User not found!",null);
        else{
            if(userService.checkPassword(userService.findByEmail(user.getEmail()),user.getPassword() ))
                return new MessageResponse(200,"Welcome!",userService.findByEmail(user.getEmail()));
            else return new MessageResponse(404,"Wrong password!",null);
        }
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    public MessageResponse register(@RequestBody User user) throws Exception {
        System.out.printf(user.toString());

        if(!userService.findByEmail(user.getEmail()).equals(Optional.empty()))
            return new MessageResponse(409,"User already exists!",null);
        else{
            return new MessageResponse(201,"Successfully registered!",userService.add(user));
        }
    }
}
