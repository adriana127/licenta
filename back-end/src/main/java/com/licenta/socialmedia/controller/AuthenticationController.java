package com.licenta.socialmedia.controller;

import com.licenta.socialmedia.dto.request.AuthenticationRequest;
import com.licenta.socialmedia.dto.response.AuthenticationResponse;
import com.licenta.socialmedia.dto.response.MessageResponse;
import com.licenta.socialmedia.exception.ApiExceptionResponse;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.security.JwtUtil;
import com.licenta.socialmedia.security.session.ActiveUserStore;
import com.licenta.socialmedia.service.implementation.MyUserDetailsService;
import com.licenta.socialmedia.service.implementation.ProfileService;
import com.licenta.socialmedia.service.implementation.SecurityService;
import com.licenta.socialmedia.service.implementation.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@AllArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
    @Autowired
    private SecurityService securityService;
    @Autowired
    private ActiveUserStore activeUserStore;
    @Autowired
    private final UserService userService;
    @Autowired
    private final ProfileService profileService;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "/auth")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            AuthenticationResponse response = securityService.login(authenticationRequest);
            activeUserStore.addUser(authenticationRequest.getUsername());
            return ResponseEntity.ok(response);
        } catch (ApiExceptionResponse e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(409, "Wrong credentials!", null));
        }
    }
    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/register")
    public MessageResponse register(@RequestBody User user) throws Exception {
        System.out.printf(user.toString());

        if (!userService.findByUsername(user.getUsername()).equals(Optional.empty()))
            return new MessageResponse(409, "User already exists!", null);
        else {
            User newUser = userService.add(user);
            Profile profile = new Profile();
            profile.setUser(newUser);
            profileService.add(profile);
            return new MessageResponse(201, "Successfully registered!", newUser);
        }
    }
}
