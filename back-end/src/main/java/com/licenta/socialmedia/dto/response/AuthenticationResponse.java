package com.licenta.socialmedia.dto.response;

import com.licenta.socialmedia.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationResponse {
    private String accessToken;
    private String type = "Bearer";
    private Long id;
    private User user;
    private List<String> roles;

    public AuthenticationResponse(String accessToken, Long id, User user, List<String> roles) {
        this.accessToken = accessToken;
        this.id = id;
        this.user = user;
        this.roles = roles;
    }
}
