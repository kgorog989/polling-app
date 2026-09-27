import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Paper, Typography, Divider, Stack } from '@mui/material';
import { Create, People, AppRegistration, HowToVote, ArrowForward } from '@mui/icons-material';

function Homepage() {

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        pt: { xs: 4, md: 10 },
        pb: 12,
        overflowX: 'hidden'
      }}
    >
      <Container maxWidth="lg" >
        <Grid container spacing={4} sx={{ minHeight: '65vh', alignItems: 'center' }} >
          <Grid xs={12} md={7}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '3.8rem' },
                  lineHeight: 1.15,
                  mb: 3,
                  letterSpacing: '-0.02em'
                }}
              >
                Make every opinion count,{' '}
                <Box
                  component="span"
                  sx={{ color: "secondary.main" }}
                >
                  instantly.
                </Box>
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, fontWeight: 400, lineHeight: 1.6, maxWidth: '600px' }}
              >
                Create clean, simple polls in seconds, share them with anyone, and watch responses stream in real-time. Built to be simple and easy to understand.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AppRegistration />}
                  onClick={() => navigate("/register")}
                  sx={{
                    py: 1.8,
                    px: 4,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    textTransform: 'none'
                  }}
                >
                  Get Started For Free
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>


      <Box sx={{ mt: { xs: 12, md: 5 }, py: 8, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' }}>
        <Divider variant="middle" aria-hidden="true" sx={{ mx: 15, mb: 5, bgcolor: 'secondary.main' }} />
        <Container maxWidth="lg" sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>
              HOW DOES IT WORK?
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>
              How Polling Works in 3 Simple Steps
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              No overcomplications or unnecessary steps. Get your question out to your audience in under a minute.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Log In or Create an Account',
                description: 'Join our platform to create polls, vote, and track your activity and progress and of others in a fast, simple and secure way.',
                icon: <People sx={{ fontSize: 32, color: 'primary.main' }} />
              },
              {
                step: '02',
                title: 'Create Your Poll',
                description: 'Set your question, add custom multiple-choice options, and wait for the results.',
                icon: <Create sx={{ fontSize: 32, color: 'primary.main' }} />
              },
              {
                step: '03',
                title: 'Watch Results or Vote',
                description: 'Track incoming responses and check detailed vote statistics update in real time. Don\'t forget to vote, like and comment on other polls!',
                icon: <HowToVote sx={{ fontSize: 32, color: 'primary.main' }} />
              }
            ].map((card, index) => (
              <Grid xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: '20px',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    bgcolor: 'background.paper',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: (theme) =>
                        theme.palette.mode === 'dark'
                          ? '0 12px 30px rgba(0,0,0,0.4)'
                          : '0 12px 30px rgba(0,0,0,0.08)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '16px',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(25, 118, 210, 0.15)'
                            : 'rgba(25, 118, 210, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 800, color: 'text.disabled', opacity: 0.4 }}
                    >
                      {card.step}
                    </Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {card.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: { xs: 12, md: 10 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 8 },
            borderRadius: '28px',
            textAlign: 'center',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #121212 100%)`
                : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, #f4f6f8 100%)`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: '1.8rem', sm: '2.5rem' },
              letterSpacing: '-0.01em'
            }}
          >
            Ready to create your first poll?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '500px', mx: 'auto', lineHeight: 1.6 }}
          >
            Join thousands of users creating fast, engaging polls every day. Sign up in under 30 seconds.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/register")}
            endIcon={<ArrowForward />}
            sx={{
              py: 1.8,
              px: 5,
              fontSize: '1.05rem',
              fontWeight: 600,
              borderRadius: '14px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
              textTransform: 'none'
            }}
          >
            Create Your Free Account
          </Button>
        </Paper>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 12, pt: 4, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Polling App. Built with Spring Boot & React.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Made by Krisztina Görög
          </Typography>
        </Box>
      </Container>
      
    </Box>
  )
}

export default Homepage