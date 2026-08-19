package com.poll.dtos;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwtToken;

    private String Name;
    
}
