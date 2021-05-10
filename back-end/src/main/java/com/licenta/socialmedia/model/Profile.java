package com.licenta.socialmedia.model;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String displayName;
    private String description;
    @Lob
    byte[] photo;
    @OneToOne
    @JoinColumn
    private User user;
}
