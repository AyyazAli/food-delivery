import { Link, Typography } from '@material-ui/core';
import React from 'react'

const Copyright = (props) => {
    return (
        <Typography variant="body2" color="textSecondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://toptal.com" target="__blank">
                Toptal Food Delivery
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;