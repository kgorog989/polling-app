import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Autocomplete, Avatar, Backdrop, Button, Box, Chip, CircularProgress, createTheme, Container, CssBaseline, TextField, ThemeProvider, Typography} from '@mui/material'
import { postPoll } from '../../../services/poll/poll'

const defaultTheme = createTheme()

const CreatePoll = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: [],
    expiredAt: null
  });
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)
      try {
        const obj = {
          question: formData.question,
          options: formData.options,
          expiredAt: formData.expiredAt.$d
        }
        const response = await postPoll(obj)
        if(response.status === 201){
          navigate("/dashboard")
          enqueueSnackbar(`Poll posted successfully`, {variant: 'success', autoHideDuration: 5000})
        }
  
      } catch (error) {
        enqueueSnackbar('An error occurred while creating poll!', {variant: 'error', autoHideDuration: 5000})
      } finally {
        setLoading(false)
      }
    }
    
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box 
          sx={{
            marginTop:8,
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
            }}
            >

              <Avatar sx={{m:1, bgcolor: "primary.main"}}>
                  <HowToVoteIcon />
              </Avatar>

              <Typography variant='h5' component="h1">
                  Create Poll
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
                <TextField 
                  margin='normal'
                  multiline
                  rows={2}
                  sx={{ width: '70ch' }}
                  required
                  id='outlined-multiline-static'
                  label='Enter Question'
                  name='question'
                  autoFocus
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />

                <Autocomplete 
                  multiple
                  sx={{ width: '70ch' }}
                  options={[]}
                  freeSolo
                  value={formData.options}
                  onChange={(event, newValue) => setFormData({ ...formData, options: newValue })}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip key={index} label={option} {...getTagProps({ index })} />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin='normal'
                      label='Options'
                      name='options'
                    />
                  )}
                  
                />

                <DateTimePicker
                  sx={{ mt: 3, width: '70ch'}}
                  label="Expiration Date"
                  value={formData.expiredAt}
                  onChange={(date) => setFormData({ ...formData, expiredAt: date })}
                />

                <Button 
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{mt:3, mb:2}}
                  disabled={!formData.question || formData.options.length === 0 || !formData.expiredAt}
                >
                  {loading ? <CircularProgress color='success' size={24} /> : 'Post Poll'}
                </Button>

              </Box>
            </Box>
        </Container>
      </ThemeProvider>

      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={loading}
        >
        <CircularProgress color='success' />
      </Backdrop>
    </>
  )
}

export default CreatePoll