import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    main: {
        margin: "auto",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        marginTop: "20%"
    }
})

const NotAuthorized = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.main}>
            <Typography gutterBottom={2} variant="h2" color="error">
                You are not authorized to access this page
            </Typography>
        </Grid>
    )
}


export default NotAuthorized;