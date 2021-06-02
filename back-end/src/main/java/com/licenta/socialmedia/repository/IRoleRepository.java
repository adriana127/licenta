package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends CrudRepository<Role, Long> {
}
