import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

import { AppBar, Toolbar, Typography, IconButton, makeStyles } from '@material-ui/core';

import { getAwsAccountDetails } from './action';

import './Navbar.css';
const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    accountDetails: {
        position: 'absolute',
        right: '56px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountName: {
        marginRight: '20px',
    },
}));

const Navbar = () => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { data: accountDetails } = useSelector((state) => state.awsAccountReducer);

    useEffect(() => {
        dispatch(getAwsAccountDetails());
    }, []);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar className="tool-bar">
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <img className="navbar-icon" />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AWS Security Management
                    </Typography>
                    {accountDetails?.name && (
                        <div className={classes.accountDetails}>
                            <span className={classes.accountName}>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    {accountDetails?.name}
                                </Typography>
                            </span>
                            <Avatar>
                                {accountDetails?.name ? accountDetails?.name.slice(0, 1).toUpperCase() : 'A'}
                            </Avatar>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
