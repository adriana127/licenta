package com.licenta.socialmedia.service;

import com.licenta.socialmedia.dto.request.AuthenticationRequest;
import com.licenta.socialmedia.dto.response.AuthenticationResponse;
import com.licenta.socialmedia.exception.ApiExceptionResponse;
import com.licenta.socialmedia.repository.IUserRepository;
import com.licenta.socialmedia.security.JwtUtil;
import com.licenta.socialmedia.security.UserDetailsImpl;
import com.licenta.socialmedia.service.implementation.ISecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityService implements ISecurityService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Qualifier("myUserDetailsService")
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtils;

    @Override
    public boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || AnonymousAuthenticationToken.class.isAssignableFrom(authentication.getClass())) {
            return false;
        }

        return authentication.isAuthenticated();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest requestUser) throws ApiExceptionResponse {
        UsernamePasswordAuthenticationToken authenticationTokenRequest = new
                UsernamePasswordAuthenticationToken(requestUser.getUsername(), requestUser.getPassword());

        UserDetailsImpl userDetails;

        try {
            Authentication authentication = this.authenticationManager.authenticate(authenticationTokenRequest);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            return new AuthenticationResponse( jwt,
                    userDetails.getId(),
                    userRepository.findById(userDetails.getId()).get(),
                    roles);

        } catch (BadCredentialsException ex) {
            throw ApiExceptionResponse.builder().errors(Collections.singletonList("Bad credentials"))
                    .message("User not found").status(HttpStatus.NOT_FOUND).build();
        }
    }
}