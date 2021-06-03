package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Like;
import com.licenta.socialmedia.model.Post;
import com.licenta.socialmedia.repository.ILikeRepository;
import com.licenta.socialmedia.service.ILikeService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LikeService implements ILikeService {
    @Autowired
    private final ILikeRepository likeRepository;

    @Override
    public Like add(Like like, Post post) {

        return likeRepository.save(like);
    }

    @Override
    public void delete(Like like) {
        likeRepository.delete(like);
    }

    @Override
    public Optional<Like> findById(Long id) {
        return likeRepository.findById(id);
    }

    @Override
    public List<Like> getAll() {
        return (List<Like>) likeRepository.findAll();
    }
}
