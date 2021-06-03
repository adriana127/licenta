package com.licenta.socialmedia.service;

import com.licenta.socialmedia.dto.request.AuthenticationRequest;
import com.licenta.socialmedia.dto.response.AuthenticationResponse;
import com.licenta.socialmedia.exception.ApiExceptionResponse;
import org.springframework.stereotype.Component;

@Component
public interface ISecurityService {
    boolean isAuthenticated();

    AuthenticationResponse login(AuthenticationRequest requestUser) throws ApiExceptionResponse;
}
