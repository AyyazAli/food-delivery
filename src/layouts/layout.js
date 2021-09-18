import { AppBar as MuiAppBar, Badge, Box, Button, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from "@material-ui/core";
import { AccessTime, ChevronLeft, Dashboard, EmojiFoodBeverage, Menu, Notifications, People, ShoppingBasket, ShoppingBasketOutlined, VerifiedUser } from "@material-ui/icons";
import { makeStyles, styled } from "@material-ui/styles";
import Copyright from "components/copyright/copyright";
import Drawer from "layouts/drawer";
import AppBar from "layouts/header";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";

const useStyles = makeStyles({
    topButton: {
        float: "right"
    }
})

const ownerRoutes = [
    { name: "Restaurants", link: '/owner/restaurants', icon: <EmojiFoodBeverage /> },
    { name: "Users", link: '/owner/users', icon: <People /> }
]
const userRoutes = [
    { name: "Restaurants", link: '/restaurants', icon: <EmojiFoodBeverage /> },
    { name: "Orders", link: '/orders', icon: <AccessTime /> }
]

const Layout = ({ children, title, topButton }) => {
    const [open, setOpen] = useState(true);
    const [redirect, setRedirect] = useState(false)
    const authState = useSelector(state => state.auth)
    const owner = authState.role === "owner";
    const cart = useSelector(state => state.cart)
    const classes = useStyles();
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const handleCart = () => {
        setRedirect(true)
        // setRedirect(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {redirect ? <Redirect to="/cart" /> : ""}
            <AppBar position="absolute" color={owner ? 'secondary' : 'primary'} open={open}>
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
                        {authState.role.toUpperCase()} Dashboard
                    </Typography>
                    {
                        !owner ?
                            <IconButton onClick={handleCart} color="inherit" style={{ flexGrow: 1, placeContent: "flex-end" }}>
                                <Badge badgeContent={cart.count} color="secondary">
                                    <ShoppingBasketOutlined />
                                </Badge>
                            </IconButton>
                            : ""
                    }
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
                    <img
                        src="https://www.toptal.com/toptal-logo.png"
                        alt="Toptal Icon"
                        width={116}
                        height={32} />
                    {/* <IconButton onClick={toggleDrawer}> */}
                    {/* </IconButton> */}
                </Toolbar>
                <Divider />
                <List>
                    {(owner ? ownerRoutes : userRoutes).map((oneItem, index) => {
                        return (
                            <Link key={index} to={oneItem.link} style={{ textDecoration: "none" }}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {oneItem.icon}
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

export default Layout;