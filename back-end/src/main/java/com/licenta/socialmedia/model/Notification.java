package com.licenta.socialmedia.model;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

public class Notification {
    @OneToOne
    @JoinColumn
    User sender;
    @OneToOne
    @JoinColumn
    User receiver;
    String message;
    @OneToOne
    @JoinColumn
    Post post;
}
