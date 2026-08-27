package com.poll.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poll.entities.Vote;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    
    boolean existsByPollIdAndUserId(Long pollId, Long userId);
    
    boolean existsByPollIdAndUserIdAndOptionsId(Long pollId, Long userId, Long optionId);
}
