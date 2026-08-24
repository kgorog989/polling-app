package com.poll.dtos;

import lombok.Data;

@Data
public class OptionsDTO {
    
    private Long id;

    private String title;

    private Long pollId;

    private Integer voteCount;
}
