package com.poll.controllers.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poll.dtos.CommentDTO;
import com.poll.dtos.LikesDTO;
import com.poll.dtos.PollDTO;
import com.poll.dtos.VoteDTO;
import com.poll.services.user.PollService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@CrossOrigin("*")
public class PollController {
    
    private final PollService pollService;

    @PostMapping("/poll")
    public ResponseEntity<?> postPoll(@RequestBody PollDTO pollDTO) {
        PollDTO createdPollDTO = pollService.postPoll(pollDTO);
        if (createdPollDTO != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPollDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/poll/{id}")
    public ResponseEntity<Void> deletePoll(@PathVariable Long id) {
        pollService.deletePoll(id);
        return ResponseEntity.ok(null);
    }
    
    @GetMapping("/polls")
    public ResponseEntity<?> getAllPolls() {
        return ResponseEntity.ok(pollService.getAllPolls()); 
    }

    @GetMapping("/my-polls")
    public ResponseEntity<?> getMyPolls() {
        return ResponseEntity.ok(pollService.getMyPolls()); 
    }

    @GetMapping("/poll/like/{id}")
    public ResponseEntity<?> giveLikeToPoll(@PathVariable Long id) {
        LikesDTO likeDTO = pollService.giveLikeToPoll(id);
        if (likeDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(likeDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/poll/comment")
    public ResponseEntity<?> postCommentOnPoll(@RequestBody CommentDTO commentDTO) {
        CommentDTO postedCommentDTO = pollService.postCommentOnPoll(commentDTO);
        if (postedCommentDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(postedCommentDTO);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/poll/vote")
    public ResponseEntity<?> postVoteOnPoll(@RequestBody VoteDTO voteDTO) {
        try {
            return ResponseEntity.ok(pollService.postVoteOnPoll(voteDTO));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/poll/{id}")
    public ResponseEntity<?> getPollById(@PathVariable Long id) {
        return ResponseEntity.ok(pollService.getPollById(id)); 
    }
}
