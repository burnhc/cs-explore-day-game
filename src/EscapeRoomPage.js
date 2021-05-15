import { React, Component } from 'react';
import './App.css';
import EscapeRoom from './EscapeRoom';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Instructions from "./Instructions";
import Fab from '@material-ui/core/Fab';
import { ButtonGroup } from "@material-ui/core";
import CheatSheet from './CheatSheet';
import { Rnd } from 'react-rnd';

const drawerWidth = '30%';

const styles = theme => ({
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  closeHelp: {
    textAlign: "right",
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 10000,
    borderRadius: "10px",
  },
  fabButton: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    borderRadius: "0 !important",
    boxShadow: 'none',
  },
  helpWindow: {
    height: "100%",
    width: "100%",
    overflow: "auto",
    padding: "20px",
  },
});

class EscapeRoomPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      openInstructions: false,
      openHelp: false,
      panelWidth: 300,
      panelHeight: 200,
    };
  }
  
  handleClose = () => {
    this.setState({
      open: false,
      openInstructions: true
    })
  };

  handleCloseInstructions = () => {
    this.setState({
      openInstructions: false
    })
  }

  recenterHelp = () => {
    this.rnd.updatePosition({ x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 100});
  }

  render () {
    const SouthEastArrow = () => (
      <svg width="20px" height="20px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="m70.129 67.086l1.75-36.367c-0.035156-2.6523-2.9414-3.6523-4.8164-1.7773l-8.4531 8.4531-17.578-17.574c-2.3438-2.3438-5.7188-1.5625-8.0586 0.78125l-13.078 13.078c-2.3438 2.3438-2.4141 5.0117-0.074219 7.3516l17.574 17.574-8.4531 8.4531c-1.875 1.875-0.83594 4.8203 1.8164 4.8555l36.258-1.8594c1.6836 0.019531 3.1328-1.2812 3.1133-2.9688z" />
      </svg>
    );

    const CustomHandle = props => (
      <div
        style={{
          background: "#fff",
          borderRadius: "2px",
          border: "1px solid #ddd",
          height: "100%",
          width: "100%",
          padding: 0,
        }}
        className={"SomeCustomHandle"}
        {...props}
      />
    );

    const BottomRightHandle = () => (
      <CustomHandle>
        <SouthEastArrow />
      </CustomHandle>
    );

    const { classes } = this.props;
    const style = {
      position: "fixed",
      border: "solid 1px #ddd",
      background: "#fff",
      zIndex: 10000,
      borderRadius: "5px",
    };
    return (
        <div>
        <div className={classes.fab}>
        <ButtonGroup variant="contained">
          <div hidden={!this.state.openHelp}>
            <Fab
              className={classes.fabButton}
              elevation={0}
              variant="extended"
              onClick={() => this.recenterHelp()}>
            Recenter
            </Fab>
          </div>
          <Fab
            className={classes.fabButton}
            elevation={0}
            variant="extended"
            onClick={() => this.setState({openHelp: !this.state.openHelp})}>
          {this.state.openHelp ? 'Close Cheat Sheet' : 'Open Cheat Sheet'}
          </Fab>
          </ButtonGroup>
        </div>
        <div hidden={!this.state.openHelp}>
          <Rnd
          ref={c => { this.rnd = c; }}
          style={style}
          default={{
            x: 400,
            y: 205,
            width: 400,
            height: 190,
          }}
          resizeHandleComponent={{ bottomRight: <BottomRightHandle /> }}
          minWidth={400}
          minHeight={190}
          >
          <div className={classes.helpWindow}>
          <CheatSheet />
          </div>
          </Rnd>
        </div>
        <div className={classes.root}>
            <Backdrop
              className={classes.backdrop}
              open={this.state.open}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <Instructions 
                    open={this.state.openInstructions}
                    handleClose={() => this.handleCloseInstructions()}/>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
              paper: classes.drawerPaper,
              }}>
              <Toolbar />
              <br/>
              <iframe
                    title='pythonEditor'
                    onLoad={ this.handleClose }
                    height="100%"
                    width="100%"
                    src="https://burnhc.github.io/browser-python-repl/"
                    scrolling="no"
                    frameBorder="no"
                    allowtransparency="true"
                    allowFullScreen
                    sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals">
                </iframe>
          </Drawer>
          <div id={'escaperoom'}>
            <EscapeRoom />
          </div>
        </div>
        </div>
    )
  }
}
export default withStyles(styles, { withTheme: true }) (EscapeRoomPage);