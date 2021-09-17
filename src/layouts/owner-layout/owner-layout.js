import { AppBar as MuiAppBar, Badge, Box, Button, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@material-ui/core";
import { ChevronLeft, Dashboard, Menu, Notifications } from "@material-ui/icons";
import { makeStyles, styled } from "@material-ui/styles";
import Copyright from "components/copyright/copyright";
import Drawer from "layouts/drawer";
import AppBar from "layouts/header";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    topButton: {
        float: "right"
    }
})

const mainListItems = [
    { name: "Restaurants", link: '/owner/restaurants' },
    { name: "Meals", link: '/owner/restaurants' }
]
const OwnerLayout = ({ children, title, topButton }) => {
    const [open, setOpen] = useState(true);
    const classes = useStyles();
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Owner Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    {mainListItems.map(oneItem => {
                        return (
                            <Link to={oneItem.link} style={{ textDecoration: "none" }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Dashboard />
                                    </ListItemIcon>
                                    <ListItemText primary={oneItem.name} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
                <Divider />
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    top: "1rem",
                    marginTop: "2rem"

                }} sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2} direction="column">
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={6}>

                                <Typography variant="h2" component="h4" color="primary">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {
                                    topButton ? (<Button className={classes.topButton} onClick={topButton.action} variant="contained" color="primary">
                                        {topButton.text}
                                    </Button>) : ""
                                }

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {children}
                        </Grid>
                    </Grid>

                </Container>
                <Copyright sx={{ pt: 4 }} />
            </Box>
        </Box >
    );
}

export default OwnerLayout;