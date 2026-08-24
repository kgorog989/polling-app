package com.poll.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poll.entities.Options;

@Repository
public interface OptionsRepository extends JpaRepository<Options, Long> {
    
}
