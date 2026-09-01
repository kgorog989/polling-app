package com.poll.dtos;

import java.util.List;

import lombok.Data;

@Data
public class PollDetailsDTO {
    
    private PollDTO pollDTO;

    private List<CommentDTO> commentDTOS;

    private Long likesCount;

    private Long commentsCount;

}
