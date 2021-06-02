package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Follow;
import com.licenta.socialmedia.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFollowRepository extends CrudRepository<Follow, Long> {
    List<Follow> findByFollowed(User followed);

    List<Follow> findByFollower(User follower);

    Follow findByFollowerAndFollowed(User follower, User followed);

}
