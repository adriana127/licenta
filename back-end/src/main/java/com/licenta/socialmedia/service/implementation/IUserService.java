package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User add(User user);
    void delete(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    boolean checkPassword(Optional<User> user, String password);
    List<User> getAll();
}
