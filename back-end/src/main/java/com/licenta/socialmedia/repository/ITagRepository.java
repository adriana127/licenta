package com.licenta.socialmedia.repository;

import com.licenta.socialmedia.model.Tag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITagRepository extends CrudRepository<Tag,Long> {
}
