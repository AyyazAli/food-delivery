import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  header: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto',
    padding: '80px 24px',
    [theme.breakpoints.up('md')]: {
      padding: '160px 24px'
    }
  },
  buttons: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  },
  mediaContainer: {
    margin: '0 auto',
    maxWidth: 1600,
    padding: '1rem',
    overflow: 'hidden'
  },
  media: {
    width: '100%'
  },
  stats: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1)
  },
  statsInner: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    margin: '0 auto'
  }
}));

const Header = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <div className={classes.mediaContainer}>
          <img
            style={{ margin: 'auto', display: 'flex' }}
            align="center"
            src="https://www.toptal.com/toptal-logo.png"
            alt="Toptal Icon"
            width={232}
            height={64}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h1"
        >
          Food Delivery
        </Typography>
        <Typography
          align="center"
          component="h2"
          variant="subtitle1"
        >
          This is a test product to test the skills and I have used react redux to save the state of application.
          For routing, I'm using react-router and have added authentication to the application.
        </Typography>
        <div className={classes.buttons}>
          <Button
            color="primary"
            component={Link}
            to="/login"
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
      <div className={classes.stats}>
        <Grid
          alignItems="center"
          className={classes.statsInner}
          container
          justify="center"
          spacing={3}
        >
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              color="inherit"
              gutterBottom
              variant="h3"
            >
              Online Food
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
            >
              Delivers online
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              color="inherit"
              gutterBottom
              variant="h3"
            >
              Track Orders
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
            >
              Track your order online
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              color="inherit"
              gutterBottom
              variant="h3"
            >
              Top Restaurants
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
            >
              All Kind of restaurants near you
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              color="inherit"
              gutterBottom
              variant="h3"
            >
              Luxury Meals
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
            >
              Sea Food, Fast Food, Chineese
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
