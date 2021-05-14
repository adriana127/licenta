package com.licenta.socialmedia.service;

import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IUserRepository;
import com.licenta.socialmedia.service.implementation.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User add(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User updateWithoutPassword(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }


    @Override
    public Optional<User> findByUsername(String email) {
       return userRepository.findByUsername(email);
    }

    @Override
    public List<User> getAll() {
        return (List<User>) userRepository.findAll();
    }
}
