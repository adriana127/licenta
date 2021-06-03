package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Comment;
import com.licenta.socialmedia.repository.ICommentRepository;
import com.licenta.socialmedia.service.ICommentService;
import com.licenta.socialmedia.util.NotificationEndpoints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService implements ICommentService {
    @Autowired
    ICommentRepository commentRepository;
    @Override
    public Comment add(Comment comment) {

        return commentRepository.save(comment);
    }

    @Override
    public void delete(Comment user) {

    }

    @Override
    public Optional<Comment> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Comment> getAll() {
        return (List<Comment>) commentRepository.findAll();
    }
}
