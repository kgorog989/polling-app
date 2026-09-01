package com.poll.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poll.entities.Likes;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    List<Likes> findAllByPollId(Long id);

    Optional<Likes> findByPollIdAndUserId(Long pollId, Long userId);
    
}
