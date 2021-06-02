package com.licenta.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import javax.persistence.*;
import java.util.List;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nickname;
    private String password;
    private String username;

    @OneToMany
    @JoinColumn
    private List<Role> roles;

    @OneToMany
    @JoinColumn
    private List<Post> posts;

    @OneToMany
    @JoinColumn
    private List<Follow> followers;

    @OneToMany
    @JoinColumn
    private List<Follow> following;
}

