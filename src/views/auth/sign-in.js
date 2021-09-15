import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography, Link as RouterLink } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Copyright from '../../components/copyright/copyright';
import { makeStyles } from "@material-ui/styles";
import axios from 'axios'

const useStyles = makeStyles({
    container: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
})

const SignIn = () => {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setError(undefined)
        // eslint-disable-next-line no-console
        try {
            const { data: respopnseData } = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
                email: data.get('email'),
                password: data.get('password')
            })
            console.log(respopnseData)
        } catch (err) {
            setError(err.response.data)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                        {error ? error.message : ""}
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
                    <Grid container>
                        <Grid item xs>
                            <Link href="#">
                                <Typography variant="body2">
                                    Forgot password?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up">
                                <Typography>
                                    Don't have an account? Sign Up
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default SignIn