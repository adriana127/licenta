package com.licenta.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


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

    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER)
    private Set<Role> roles;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Post> tags;

}

