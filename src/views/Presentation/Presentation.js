import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Header
} from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Presentation = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Header />
    </Fragment>
  );
};

export default Presentation;
