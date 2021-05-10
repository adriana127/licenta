package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Profile;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProfileRepository extends CrudRepository<Profile,Long> {
}
