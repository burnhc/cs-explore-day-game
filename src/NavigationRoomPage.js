import CheatSheet from "./CheatSheet";
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = '50%';

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      position: 'absolute',
      right: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    }
  }));

export default function NavigationRoomPage() {
    const classes = useStyles();

    return (
        <div id={'NavigationRoomPage'}>
            <div id={'NavigationRoomLeft'}>
                <iframe
                    title='hello'
                    height="100%"
                    width="100%"
                    src="https://replit.com/@burnhc/cs-explore-day?lite=true"
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