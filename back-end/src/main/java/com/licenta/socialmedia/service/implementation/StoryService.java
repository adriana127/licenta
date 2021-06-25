package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Story;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IStoryRepository;
import com.licenta.socialmedia.service.IStoryService;
import com.licenta.socialmedia.util.PhotoUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@AllArgsConstructor
@Service
public class StoryService implements IStoryService {
    @Autowired
    private final UserService userService;
    @Autowired
    private final FollowService followService;
    @Autowired
    private final IStoryRepository storyRepository;
    @Override
    public Story add(Story user) {
        return storyRepository.save(user);
    }

    @Override
    public void delete(Story user) {
        storyRepository.delete(user);
    }

    @Override
    public Optional<Story> findById(Long id) {
        return storyRepository.findById(id);
    }

    @Override
    public List<Story> getAll(Long userId, int numberRequest) {
        var user=userService.findById(userId);
        var followings=followService.getFollowing(user.get());
        List<Story> stories= new ArrayList<>();
        followings.forEach(following->{
            var result=storyRepository.findAllByUser_IdnAndAndFollowers_Id(
                    following.getUser().getId(),
                    user.get().getId()
                    ,
                    PageRequest.of(numberRequest,5)).get();
            if(!result.isEmpty())
            stories.addAll(result
                    .getContent());
        });
        stories.forEach(story->{story.setPhoto(PhotoUtils.decompressBytes(story.getPhoto()));});
        return stories;
    }
}
