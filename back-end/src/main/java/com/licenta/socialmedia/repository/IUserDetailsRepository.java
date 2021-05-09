package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.UserDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserDetailsRepository extends CrudRepository<UserDetails,Long> {
}
