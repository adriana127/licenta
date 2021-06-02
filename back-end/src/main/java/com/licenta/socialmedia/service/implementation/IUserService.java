package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User add(User user);

    User updateWithoutPassword(User user);

    void delete(User user);

    Optional<User> findById(Long id);

    Optional<User> findByUsername(String email);

    List<User> getAll();
}
