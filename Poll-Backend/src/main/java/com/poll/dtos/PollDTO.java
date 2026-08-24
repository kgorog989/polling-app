package com.poll.dtos;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class PollDTO {
    
    private Long id;

    private String question;

    private Date postedDate;

    private Date expiredAt;

    private Integer totalVoteCount;

    private List<String> options;
    
}
