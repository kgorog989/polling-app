import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { getAllPolls } from '../../../services/poll/poll';
import { useNavigate } from 'react-router-dom';
import { Avatar, Backdrop, Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import moment from 'moment/moment'

const Dashboard = () => {
  const [polls, setPolls] = useState([])
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getAllPolls()
      if(response.status === 200){
        setPolls(response.data)
      }

    } catch (error) {
      enqueueSnackbar('An error occurred while fetching polls', {variant: 'error', autoHideDuration: 5000})
    } finally {
      setLoading(false)
    }
  }, [enqueueSnackbar])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
        <Box sx={{flexGrow: 1}}>
          <Grid container spacing={3} sx={{ flexDirection: 'column', alignItems: 'center' }}>
            {polls.length === 0 && !loading ? (
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Typography variant='h6' color='text.secondary' gutterBottom>
                  No Polls Found
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => navigate("/poll/create")}>
                      Create a Poll
                    </Button>
              </Box>
            ) : (
              polls.map(poll => (
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
                          onClick={() => navigate(`/poll/${poll.id}/view`)}
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
                  </Card>
                </Grid>
              ))
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

export default Dashboard