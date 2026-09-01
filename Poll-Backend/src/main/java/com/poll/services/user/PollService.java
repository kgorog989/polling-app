package com.poll.services.user;

import java.util.List;

import com.poll.dtos.CommentDTO;
import com.poll.dtos.LikesDTO;
import com.poll.dtos.PollDTO;
import com.poll.dtos.PollDetailsDTO;
import com.poll.dtos.VoteDTO;

public interface PollService {

    PollDTO postPoll(PollDTO pollDTO);
    
    void deletePoll(Long id);

    List<PollDTO> getAllPolls();

    List<PollDTO> getMyPolls();

    LikesDTO giveLikeToPoll(Long id);

    CommentDTO postCommentOnPoll(CommentDTO commentDTO);

    VoteDTO postVoteOnPoll(VoteDTO voteDTO);

    PollDetailsDTO getPollById(Long pollId);
}
