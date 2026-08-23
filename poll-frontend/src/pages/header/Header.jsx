import React, { useEffect, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { isTokenValid, removeToken } from '../../utility/common';

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    const handleSignout = () => {
        navigate("/login")
        removeToken()
    }

    useEffect(() => {
        const isLoggedIn = isTokenValid()
        setIsUserLoggedIn(isLoggedIn)
    }, [location])

    useEffect(() => {
        const interval = setInterval(() => {
            if(!isTokenValid()){
                setIsUserLoggedIn(false)
                handleSignout()
            }
        }, 1800000) // 30 minutes = 1 800 000 milliseconds

        return () => clearInterval(interval)
    }, [])
    
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
                    {isUserLoggedIn ? (
                        <>
                            <Button component={Link} to="/dashboard" color="inherit">Dashboard</Button>
                            <Button component={Link} to="/poll/create" color="inherit">Post Poll</Button>
                            <Button component={Link} to="/my-polls" color="inherit">My Polls</Button>
                            <Button color="inherit" onClick={handleSignout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" color="inherit">Login</Button>
                            <Button component={Link} to="/register" color="inherit">Sign Up</Button>
                        </>
                    )}


                    
                </Toolbar>
            </AppBar>
        </Box>
  )
}

export default Header