package com.licenta.socialmedia.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn
    private User user;
    private Date createdOn;
    private String description;

    @OneToMany
    @JoinColumn
    private List<Comment> comments;

    @OneToMany
    @JoinColumn
    private List<Like> likes;

    @OneToMany
    @JoinColumn
    private List<User> tags;

    @Lob
    byte[] photo;
}
