import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import {getPollById, giveLikeToPoll, postCommentOnPoll, postVoteOnPoll } from '../../../services/poll/poll';
import { useParams } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Divider, Grid, Paper, TextField, Typography, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import moment from 'moment/moment'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const ViewPollDetails = () => {
  const [poll, setPoll] = useState()
  const [likesCount, setLikesCount] = useState()
  const [commentsCount, setCommentsCount] = useState()
  const [comments, setComments] = useState()
  const [newComment, setNewComment] = useState()
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const { id } = useParams();

  const handleAddVote = async (pollId, optionId) => {
    setLoading(true)
    try {
      const obj = {
        optionId: optionId,
        pollId: pollId
      }
      const response = await postVoteOnPoll(obj)
      if(response.status === 200) {
        enqueueSnackbar('Poll voted successfully!', {variant: 'success', autoHideDuration: 3000})
        fetchData() // Refresh polls after voting
      }
    } catch (error) {
      if (error.response && error.response.status === 406) {
        enqueueSnackbar('Poll has expired and cannot be voted on.', {variant: 'error', autoHideDuration: 5000})
        fetchData()
      } else {
        enqueueSnackbar('Error while posting vote', {variant: 'error', autoHideDuration: 5000})
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLikeClick = async (pollId) => {
    setLoading(true)
    try {
      const response = await giveLikeToPoll(pollId)
      if(response.status === 200) {
        fetchData()
      }
    } catch (error) {
        enqueueSnackbar('Error while giving like', {variant: 'error', autoHideDuration: 5000})
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (pollId) => {
    setLoading(true)
    try {
      const obj = {
        pollId: pollId,
        content: newComment
      }
      const response = await postCommentOnPoll(obj)
      if(response.status === 200) {
        enqueueSnackbar('Comment posted successfully!', {variant: 'success', autoHideDuration: 5000})
        fetchData()
      }
    } catch (error) {
      enqueueSnackbar('Error while posting comment', {variant: 'error', autoHideDuration: 5000})
    } finally {
      setNewComment('')
      setLoading(false)
    }
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getPollById(id)
      if (response.status === 200) {
        setPoll(response.data.pollDTO)
        setLikesCount(response.data.likesCount)
        setCommentsCount(response.data.commentsCount)
        setComments(response.data.commentDTOS)
      }
    } catch (error) {
      enqueueSnackbar('Error while getting poll', {variant: 'error', autoHideDuration: 5000})
      setPoll(null) // Explicitly set poll to null on error
    } finally {
      setLoading(false)
    }
  }, [id, enqueueSnackbar])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
        <Box sx={{flexGrow: 1, mb: 3}}>
          <Grid container spacing={3} sx={{ flexDirection: 'column', alignItems: 'center' }}>
            {poll === undefined && !loading ? (
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Typography variant='h4' sx={{ fontSize: '3rem'}}>
                  :(
                </Typography>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  Oops, Poll Not Found
                </Typography>
              </Box>
            ) : poll && (
                <Grid key={poll.id} xs={12} sm={8} sx={{width: 450, maxWidth: '100%'}}>
                  <Card sx={{width: 450, maxWidth: '100%', mt: 3}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: blue[500]}} aria-label='recipe'>
                              {poll.username.charAt(0)}
                            </Avatar>
                        }
                        title={poll.username}
                        subheader={moment(poll.postedDate).fromNow()}
                    />
                    <CardContent sx={{mb: 0, pt: 0}}>
                      <Typography
                          variant='body2'
                          color='text.primary'
                          sx={{cursor: 'pointer'}}
                      >
                        <strong>{poll.question}</strong>
                      </Typography>
                      {poll.optionsDTOs.map(option => (
                        <Paper 
                            elevation={3}
                            sx={{p: 1, width: '95%', mt: 1}}
                            key={option.id}
                        >
                          {option.title}
                        </Paper>
                      ))}
                    </CardContent>

                    <CardActions disableSpacing sx={{pt: 0, justifyContent: 'center', textAlign: 'center'}}>
                      <>
                            <Typography variant='body2' color='text.secondary'>
                              Vote: <strong>{poll.totalVoteCount}</strong>
                            </Typography>
                            <Typography variant='body2' color='text.secondary' sx={{ml: 2}}>
                              Expires At: <strong>{moment(poll.expiredAt).format('HH:mm on MMMM D, YYYY')}</strong>
                            </Typography>
                      </>
                    </CardActions>
                    <Divider />
                    <Box 
                      sx={{ 
                        width: '100%', 
                        py: 1, 
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                      }}
                    >
                      {/* Likes */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {poll.liked ? (
                          <FavoriteIcon sx={{ color: 'red', cursor: 'pointer' }} />
                        ) : (
                          <FavoriteBorderIcon onClick={() => handleLikeClick(poll.id)} />
                        )}
                        <Typography component="span">{likesCount}</Typography>
                      </Stack>

                      {/* Comments */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CommentIcon sx={{ color: blue[500] }} />
                        <Typography component="span">{commentsCount}</Typography>
                      </Stack>
                    </Box>
                  </Card>
                  <Box sx={{ mt: 3 }}>
                    <Card sx={{ maxWidth: 450 }}>
                      <CardContent>
                              <Typography variant='h6' gutterBottom
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center'
                                }}>
                                  Comments
                                </Typography>
                                <Box sx={{ maxHeight: '200px', overflowY: 'auto', p: 1 }}>
                                  {comments.map((comment, index) => (
                                    <>
                                      <Divider />
                                      <Typography key={index} variant='body1' gutterBottom sx={{ mb: -2, pt: 2 }}>
                                        <strong>{comment.content}</strong>
                                      </Typography>
                                      <p>posted {moment(comment.createdAt).fromNow()} by {comment.username}
                                      </p>
                                      <Divider />
                                    </>
                                  ))}
                                </Box>
                                <Box sx={{ mt: 2 }}>
                                  <TextField 
                                      fullWidth
                                      variant='outlined'
                                      label='Add a comment'
                                      value={newComment}
                                      onChange={(e) => setNewComment(e.target.value)}
                                  />
                                </Box>
                                <Box sx={{ mt: 2 }} textAlign='right'>
                                  <Button 
                                      variant='contained'
                                      color='primary'
                                      disabled={!newComment || newComment.trim() === ''}
                                      onClick={() => handleCommentSubmit(poll.id)}>
                                        Post Comment
                                      </Button>
                                </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
            )}
          </Grid>
        </Box>
        <Backdrop
          sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
          open={loading}
          >
          <CircularProgress color='success' />
        </Backdrop>
    </>
  )
}

export default ViewPollDetails