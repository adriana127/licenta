package com.licenta.socialmedia.model;

import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    boolean state;
    String message;
    private Date createdOn;
    @ManyToOne
    User sender;
    @ManyToOne
    User receiver;
    @ManyToOne
    Post post;


}
