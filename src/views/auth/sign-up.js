import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link as MuiLink, TextField, Typography } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "store/actions";
import Copyright from "../../components/copyright/copyright";




const SignUp = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth)
    useEffect(() => {
        console.log("signin")
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        dispatch(signUp({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            passwordConfirm: data.get('passwordConfirm'),
        }))
    };

    return (
        <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Box
                sx={{
                    marginTop: "40%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar style={{ m: 1, backgroundColor: 'primary' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Confirm Password"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Typography color="error">
                        {authState.error ? authState.error.message : ""}
                    </Typography>
                    <Grid sx={{ mt: 3, mb: 2 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                        >
                            Sign Up
                        </Button>
                    </Grid>
                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <MuiLink component={Link} to="/login" variant="body2">
                                    Already have an account? Sign in
                                </MuiLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}

export default SignUp;