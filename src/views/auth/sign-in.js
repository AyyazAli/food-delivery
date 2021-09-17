import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography, Link as MuiLink } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Copyright from '../../components/copyright/copyright';
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'store/actions';

const useStyles = makeStyles({
    container: {
        marginTop: "40%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const SignIn = () => {
    const classes = useStyles();
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        dispatch(login(data.get('email'), data.get('password')))
        console.log(authState)
    };

    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Box
                className={classes.container}
            >
                <Avatar sx={{ m: 1, backgroundColor: "primary" }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        variant="outlined"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        variant="outlined"
                        autoComplete="current-password"
                    />
                    <Typography color="error">
                        {authState.error ? authState.error.message : ""}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        color="primary"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Box sx={{ mt: 3, mb: 2 }}>

                        <Grid container space={2}>
                            <Grid item>
                                <Link to="/sign-up">
                                    <Typography>
                                        Don't have an account? Sign Up
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default SignIn