import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Router from "./Router";
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "./Theme";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export default function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={ mainTheme }>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={classes.appBar}
          position="sticky">
          <Toolbar>
            <Typography variant="h6" noWrap>
                CS Explore Day
            </Typography>
          </Toolbar>
          </AppBar>
          <Router/>
      </div>
    </MuiThemeProvider>
  );
}