package com.poll.services.user;

import java.util.List;

import com.poll.dtos.PollDTO;

public interface PollService {

    PollDTO postPoll(PollDTO pollDTO);
    
    void deletePoll(Long id);

    List<PollDTO> getAllPolls();

    List<PollDTO> getMyPolls();
}
