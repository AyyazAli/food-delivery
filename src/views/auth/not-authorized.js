import { Grid, Typography } from '@material-ui/core';
import React from 'react'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    main: {
        margin: "auto",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        textAlign: "Center",
        marginTop: "50%"
    }
})

const NotAuthorized = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.main} xs={12}>
            <Typography gutterBottom={2} variant="h2" color="error">
                You are not authorized to access this page
            </Typography>
        </Grid>
    )
}


export default NotAuthorized;