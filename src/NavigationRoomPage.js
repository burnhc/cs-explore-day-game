import { React, Component } from "react";
import CheatSheet from "./CheatSheet";
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from "@material-ui/core/styles";
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const drawerWidth = '50%';

const styles = theme => ({
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

  class NavigationRoomPage extends Component {
    state = {
      open: true
    };
    
    handleClose = () => {
      this.setState({
        open: false
      })
    };

    render () {
      const { classes } = this.props;
      return (
        <div id={'NavigationRoomPage'}>
                <Backdrop
                  className={classes.backdrop}
                  open={this.state.open}>
                  <CircularProgress color="inherit" />
                </Backdrop>
            <div id={'NavigationRoomLeft'}>
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
            </div>
              <Drawer
                  className={classes.drawer}
                  variant="permanent"
                  anchor="right"
                  classes={{
                  paper: classes.drawerPaper,
                  }}>
                  <Toolbar />
                  <div id={'NavigationRoomRight'}>
                    <CheatSheet />
                </div>
              </Drawer>
        </div>
      )
    }
}
export default withStyles(styles, { withTheme: true }) (NavigationRoomPage);