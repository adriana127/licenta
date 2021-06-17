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
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn
    private User user;
    private Date createdOn;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<User> followers;

    @Lob
    byte[] photo;
}
