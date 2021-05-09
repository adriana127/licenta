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

    @ManyToOne
    @JoinColumn
    private Role role;

    @OneToOne
    @JoinColumn
    private UserDetails details;



    @OneToMany
    @JoinColumn
    private List<User> followers;

    @OneToMany
    @JoinColumn
    private List<User> following;
}

