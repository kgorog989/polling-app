import React from 'react'

import { Link } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  return (
        <Box sx={{flexGrow : 1}}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr:2}}
                        >
                            <MenuIcon/>
                    </IconButton>
                    <Typography variant='h6' component="div" sx={{flexGrow : 1}}>
                        Polling
                    </Typography>
                    <Button component={Link} to="/login" color="inherit">Login</Button>
                    <Button component={Link} to="/register" color="inherit">Sign Up</Button>
                </Toolbar>
            </AppBar>
        </Box>
  )
}

export default Header