package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.Follow;
import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IFollowRepository;
import com.licenta.socialmedia.repository.IProfileRepository;
import com.licenta.socialmedia.repository.IUserRepository;
import com.licenta.socialmedia.service.implementation.IFollowService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class FollowService implements IFollowService {
    @Autowired
    SimpMessagingTemplate template;
    @Autowired
    IFollowRepository followRepository;
    @Autowired
    IUserRepository userRepository;
    @Autowired
    IProfileRepository profileRepository;

    @Override
    public Follow add(Follow follow) {
        follow = followRepository.save(follow);
        template.convertAndSend(NotificationEndpoints.FOLLOW_ADDITION + follow.getFollowed().getId(),
                "Followed by" + follow.getFollower().getNickname());
        return follow;
    }

    @Override
    public void delete(Follow follow) {
        followRepository.delete(followRepository.findByFollowerAndFollowed(follow.getFollower(), follow.getFollower()));
    }

    @Override
    public List<Follow> getAll() {
        return null;
    }

    @Override
    public List<Profile> getSuggestions(User currentUser) {
        List<Profile> suggestions = new ArrayList<>();
        for (var profile : profileRepository.findAll()) {
            if (!profile.getUser().getId().equals(currentUser.getId()))
                if (followRepository.findByFollowerAndFollowed(currentUser, profile.getUser()) == null)
                    suggestions.add(profile);
        }
        return suggestions;
    }

    @Override
    public List<Profile> getFollowers(User followed) {
        List<Profile> profiles = new ArrayList<>();
        for (var follow : followRepository.findByFollowed(followed)) {
            profiles.add(profileRepository.findByUser(follow.getFollower()));
        }
        return profiles;
    }

    @Override
    public List<Profile> getFollowing(User follower) {
        List<Profile> profiles = new ArrayList<>();
        for (var follow : followRepository.findByFollower(follower)) {
            profiles.add(profileRepository.findByUser(follow.getFollowed()));
        }
        return profiles;
    }
}
