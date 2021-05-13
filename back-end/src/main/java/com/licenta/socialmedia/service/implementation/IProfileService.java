package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.model.Profile;

import java.util.List;
import java.util.Optional;

public interface IProfileService {
    Profile add(Profile user);
    void delete(Profile user);
    Optional<Profile> findById(Long id);
    List<Profile> getAll();
}
