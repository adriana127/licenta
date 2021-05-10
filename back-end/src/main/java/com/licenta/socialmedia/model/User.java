package com.licenta.socialmedia.model;

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

    private String email;
    private String password;
    private String username;

    @OneToMany
    @JoinColumn
    private List<Role> roles;

    @OneToMany
    @JoinColumn
    private List<Post> posts;

    @OneToOne
    @JoinColumn
    private Profile details;



    @OneToMany
    @JoinColumn
    private List<User> followers;

    @OneToMany
    @JoinColumn
    private List<User> following;
}

