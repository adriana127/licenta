package com.licenta.socialmedia.service;

import com.licenta.socialmedia.exception.ApiExceptionResponse;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IUserRepository;
import com.licenta.socialmedia.security.UserDetailsImpl;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepository userRepository;

    @SneakyThrows
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) {
        User user;
        if(userRepository.findByEmail(username).equals(Optional.empty()))
        { user=null;}
        else {
             user = userRepository.findByEmail(username).get();
        }
        if (user == null) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }

        return UserDetailsImpl.build(user);
    }

}