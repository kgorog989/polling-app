package com.poll.services.user;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.poll.dtos.OptionsDTO;
import com.poll.dtos.PollDTO;
import com.poll.entities.Options;
import com.poll.entities.Poll;
import com.poll.entities.User;
import com.poll.repositories.OptionsRepository;
import com.poll.repositories.PollRepository;
import com.poll.repositories.VoteRepository;
import com.poll.utils.JWTUtil;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PollServiceImpl implements PollService{
    
    private final JWTUtil jwtUtil;

    private final PollRepository pollRepository;

    private final OptionsRepository optionsRepository;

    private final JavaMailSender javaMailSender;

    private final VoteRepository voteRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Override
    public PollDTO postPoll(PollDTO pollDTO) {
        User user = jwtUtil.getLoggedInUser();
        if (user != null) {
            Poll poll = new Poll();
            poll.setQuestion(pollDTO.getQuestion());
            poll.setPostedDate(new Date());
            poll.setExpiredAt(pollDTO.getExpiredAt());
            poll.setUser(user);
            poll.setTotalVoteCount(0);
            Poll createdPoll = pollRepository.save(poll);

            List<Options> options = new ArrayList<>();

            for (String optionTitle : pollDTO.getOptions()) {
                Options option = new Options();
                option.setTitle(optionTitle);
                option.setPoll(createdPoll);
                option.setVoteCount(0);
                options.add(option);
            }

            List<Options> savedOptions = optionsRepository.saveAll(options);
            poll.setOptions(savedOptions);
            pollRepository.save(poll);

            if (createdPoll.getId() != null) {
                try {
                    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                    MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
                    mimeMessageHelper.setFrom(senderEmail);
                    mimeMessageHelper.setTo(user.getEmail());
                    mimeMessageHelper.setSubject("New Poll Posted");
                    // Poll posted confirmation email text
                    mimeMessageHelper.setText("Dear " + user.getFirstName() + 
                    "! This is an automated message. A new poll has been successfully posted: '" + 
                    createdPoll.getQuestion() + "'. This poll was posted on: " + createdPoll.getPostedDate() 
                    + ", and it is sceduled to expire on: " + createdPoll.getExpiredAt() + 
                    ". Thank you for your engagement and contribution to our platform. POLL APP");
                    javaMailSender.send(mimeMessage);
                    System.out.println("Mail sent to: " + user.getEmail());
                } catch (MessagingException e) {
                    System.err.println("Failed to send email: " + e.getMessage());
                }
            }
            return getPollDTOInService(createdPoll);
        }
        return null;
    }

    @Override
    public void deletePoll(Long id) {
        pollRepository.deleteById(id);
    }

    @Override
    public List<PollDTO> getAllPolls() {
        return pollRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Poll::getPostedDate).reversed())
                .map(this::getPollDTOInService)
                .collect(Collectors.toList());
    }

    @Override
    public List<PollDTO> getMyPolls() {
        User user = jwtUtil.getLoggedInUser();
        if (user != null) {
            return pollRepository.findAllByUserId(user.getId())
                .stream()
                .sorted(Comparator.comparing(Poll::getPostedDate).reversed())
                .map(this::getPollDTOInService)
                .collect(Collectors.toList());
        }
        throw new EntityNotFoundException("User not found");
    }

    public PollDTO getPollDTOInService(Poll poll){
        User loggedInUser = jwtUtil.getLoggedInUser();
        PollDTO pollDTO = new PollDTO();
        pollDTO.setId(poll.getId());
        pollDTO.setQuestion(poll.getQuestion());
        pollDTO.setExpiredAt(poll.getExpiredAt());
        pollDTO.setExpired(poll.getExpiredAt() != null && poll.getExpiredAt().before(new Date()));
        pollDTO.setPostedDate(poll.getPostedDate());
        pollDTO.setOptionsDTOs(poll.getOptions().stream().map(options -> this.getOptionsDTO(options, loggedInUser.getId(), poll.getId())).collect(Collectors.toList()));
        pollDTO.setTotalVoteCount(poll.getTotalVoteCount());

        User pollOwner = poll.getUser();

        if (loggedInUser != null && pollOwner.getId().equals(loggedInUser.getId())) {
            pollDTO.setUsername("You");
        } else {
            pollDTO.setUsername(pollOwner.getFirstName() + " " + pollOwner.getLastName());
        }

        pollDTO.setUserId(pollOwner.getId());

        if (loggedInUser != null) {
            pollDTO.setVoted(voteRepository.existsByPollIdAndUserId(poll.getId(), loggedInUser.getId()));
        }

        return pollDTO;

    }

    public OptionsDTO getOptionsDTO(Options options, Long userId, Long pollId){
        OptionsDTO optionsDTO = new OptionsDTO();
        optionsDTO.setId(options.getId());
        optionsDTO.setTitle(options.getTitle());
        optionsDTO.setPollId(options.getPoll().getId());
        optionsDTO.setVoteCount(options.getVoteCount());
        optionsDTO.setUserVotedThisOption(voteRepository.existsByPollIdAndUserIdAndOptionsId(pollId, userId, options.getId()));
        return optionsDTO;
    }

}
