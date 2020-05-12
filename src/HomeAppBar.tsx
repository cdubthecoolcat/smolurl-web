import { AppBar, Fade, Link, Switch, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

function HomeAppBar(props: any) {
  const classes = useStyles();

  return (
    <Fade in={true} timeout={2000}>
      <div className={classes.root}>
        <AppBar color="inherit" elevation={0} position="static">
          <Toolbar>
            <Typography color="inherit" className={classes.title} variant="h5">
              <Link underline="none" href="/">
                <b>smolurl</b>
              </Link>
            </Typography>
            {!props.isDark ? <Brightness4 /> : <BrightnessHigh />}
            <Switch
              checked={props.isDark}
              onChange={props.toggle}
            />
          </Toolbar>
        </AppBar>
      </div>
    </Fade>
  );
}

export default HomeAppBar;
