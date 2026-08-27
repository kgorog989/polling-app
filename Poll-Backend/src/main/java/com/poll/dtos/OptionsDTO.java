package com.poll.dtos;

import java.util.List;

import lombok.Data;

@Data
public class OptionsDTO {
    
    private Long id;

    private String title;

    private Long pollId;

    private Integer voteCount;

    private boolean userVotedThisOption;

    private List<VoteDTO> voteDTOs;
}
