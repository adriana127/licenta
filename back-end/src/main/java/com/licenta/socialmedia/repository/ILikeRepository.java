package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Like;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILikeRepository extends CrudRepository<Like, Long> {
}
