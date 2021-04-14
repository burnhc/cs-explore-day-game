import { React, Component } from 'react';
import './App.css';
import EscapeRoom from './EscapeRoom';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Instructions from "./Instructions";

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
});

class EscapeRoomPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      openInstructions: false
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

  render () {
    const { classes } = this.props;
    return (
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
          <div>
            <EscapeRoom />
          </div>
        </div>
    )
  }
}
export default withStyles(styles, { withTheme: true }) (EscapeRoomPage);