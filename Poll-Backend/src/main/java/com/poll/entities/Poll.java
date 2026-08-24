package com.poll.entities;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private Date postedDate;

    private Date expiredAt;

    private Integer totalVoteCount = 0;

    @OneToMany(mappedBy = "poll", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Options> options;
    
}
