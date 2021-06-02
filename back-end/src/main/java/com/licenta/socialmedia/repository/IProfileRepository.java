package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Profile;
import com.licenta.socialmedia.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProfileRepository extends CrudRepository<Profile, Long> {
    Profile findByUser(User user);
}
