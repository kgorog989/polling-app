package com.poll.dtos;

import java.util.Date;

import lombok.Data;

@Data
public class CommentDTO {

    private Long id;

    private String content;
    
    private Date createdAt;

    private String username;

    private Long userId;

    private Long pollId;

}
