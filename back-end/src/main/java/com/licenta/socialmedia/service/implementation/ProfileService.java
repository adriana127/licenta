package com.licenta.socialmedia.service.implementation;

import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import com.licenta.socialmedia.repository.IProfileRepository;
import com.licenta.socialmedia.service.IProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService implements IProfileService {
    @Autowired
    IProfileRepository profileRepository;

    @Override
    public Profile add(Profile user) {
        return profileRepository.save(user);
    }

    @Override
    public void delete(Profile user) {
        profileRepository.delete(user);
    }

    @Override
    public Optional<Profile> findById(Long id) {
        return profileRepository.findById(id);
    }

    @Override
    public List<Profile> getAll() {
        return (List<Profile>) profileRepository.findAll();
    }

    public Profile findByUser(User user) {
        return profileRepository.findByUser(user);
    }
}
