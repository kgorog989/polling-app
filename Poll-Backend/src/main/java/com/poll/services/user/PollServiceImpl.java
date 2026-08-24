package com.poll.services.user;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.poll.repositories.OptionsRepository;
import com.poll.repositories.PollRepository;
import com.poll.utils.JWTUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService{
    
    private final JWTUtil jwtUtil;

    private final PollRepository pollRepository;

    private final OptionsRepository optionsRepository;

    private final JavaMailSender javaMailSender;

}
