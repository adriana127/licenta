package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Chat;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.Story;
import com.licenta.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

public interface IStoryService {
    Story add(Story user);

    void delete(Story user);

    Optional<Story> findById(Long id);
    List<Story> getAll(Long userId, int numberRequest);
}
