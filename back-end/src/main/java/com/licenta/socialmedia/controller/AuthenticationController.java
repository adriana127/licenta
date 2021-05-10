package com.licenta.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.socialmedia.dto.request.AuthenticationRequest;
import com.licenta.socialmedia.dto.request.UploadPostRequest;
import com.licenta.socialmedia.dto.response.AuthenticationResponse;
import com.licenta.socialmedia.dto.response.MessageResponse;
import com.licenta.socialmedia.exception.ApiExceptionResponse;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.security.JwtUtil;
import com.licenta.socialmedia.security.session.ActiveUserStore;
import com.licenta.socialmedia.service.MyUserDetailsService;
import com.licenta.socialmedia.service.SecurityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private MyUserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtTokenUtil;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private ActiveUserStore activeUserStore;

    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path="/auth")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            AuthenticationResponse response = securityService.login(authenticationRequest);
            activeUserStore.addUser(authenticationRequest.getUsername());
            return ResponseEntity.ok(response);
        } catch (ApiExceptionResponse e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse(409,"Wrong credentials!",null));
        }
    }
}
