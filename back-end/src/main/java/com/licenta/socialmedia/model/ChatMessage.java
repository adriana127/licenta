package com.licenta.socialmedia.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String message;

    @ManyToOne
    @JoinColumn
    private Profile sender;
    @ManyToOne
    @JoinColumn
    private Chat chat;
    private Date createdOn;
    boolean state;

}
