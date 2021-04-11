import React from 'react';
import './App.css';
import EscapeRoom from './EscapeRoom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = '30%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexShrink: 0,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export default function EscapeRoomPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
              paper: classes.drawerPaper,
              }}>
              <Toolbar />
              <iframe
                title='hello' 
                height="100%"
                width="100%"
                src="https://replit.com/@burnhc/cs-explore-day-terminal?lite=true&outputonly=1"
                scrolling="no"
                frameBorder="no"
                allowtransparency="true"
                allowFullScreen
                sandbox="allow-forms allow-pointer-lock 
                        allow-popups allow-same-origin
                        allow-scripts allow-modals">
            </iframe>
          </Drawer>
          <div>
            <EscapeRoom />
          </div>
        </div>
    )
}