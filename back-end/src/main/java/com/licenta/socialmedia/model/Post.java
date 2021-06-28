package com.licenta.socialmedia.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

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

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Comment> comments;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Like> likes;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<User> tags;

    @Lob
    byte[] photo;
}
