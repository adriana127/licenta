package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Follow;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;

import java.util.List;
import java.util.Optional;

public interface IFollowService {
    Follow add(Follow follow);
    void delete(Follow follow);
    List<Follow> getAll();
    List<Profile> getSuggestions(User user);
    List<Profile> getFollowers(User user);
    List<Profile> getFollowing(User user);

}