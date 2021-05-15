import {DialogContent, Grid, IconButton, Paper, TextField} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CloseIcon from "@material-ui/icons/Close";
import Card from '@material-ui/core/Card';
import { ArrowForwardRounded, VpnKey } from "@material-ui/icons";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    flexGrow: 1,
    marginTop: 30,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  instructionscard: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    fontFamily: "Kalam",
    fontSize: 20,
    backgroundColor: '#f7edc0',
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
    fontFamily: "Inconsolata",
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#f7edc0',
  },
  cardnumber: {
    textAlign: 'left',
    fontFamily: "Kalam",
    fontSize: 20,
  }
}));

export default function DrawerPuzzle(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [unlocked, setUnlocked] = React.useState(false);
  const [passwordInput, setPasswordInput] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const verifyPassword = () => {
    if (passwordInput === 'HelloWorld3') {
        setUnlocked(true);
    }
  }

  return (
    <DialogContent>
            <div id={"drawerpuzzletop"}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{unlocked ? `You discover some papers in the drawer.` : `You try to open the drawer, but it's locked.`}</Box>
          <Box>
              <IconButton
                  color={"primary"}
                  size={"small"}
                  disableRipple
                  onClick={() => props.handleClose()}>
                  <CloseIcon/>
              </IconButton>
          </Box>
        </Box>
      </div>
      <div id={'keypage'} className={ unlocked ? 'hidden' : '' }>
              <TextField
                  type="password"
                  label="Enter the drawer key"
                  variant="outlined"
                  value={ passwordInput }
                  autoFocus
                  onChange={(e) => { setPasswordInput(e.target.value) }}
                  onKeyPress={(e) =>
                      e.key === 'Enter' ? verifyPassword() : ''}>
              </TextField>
              <IconButton
                  onClick={ verifyPassword }
                  color={"primary"}>
                  <VpnKey />
              </IconButton>
      </div>
      <div className={ unlocked ? '' : 'hidden' }>
    <div className={classes.root}>
      <AppBar position="static" color="white" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Page 1" {...a11yProps(0)} disableRipple />
          <Tab label="Page 2" {...a11yProps(1)} disableRipple />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Typography variant={'body1'}>Aha! Looks like Dr. Python left some
        notes about a <code>decode()</code> function to unlock the
        door, but it's been scrambled out of order! All the code is in
        Page 2. <b>Rewrite the code in order so that the function
        works.</b> Keep track of the correct ordering; you'll need it
        to unlock the door, along with the function itself.</Typography>
        <br/>
        <Grid item xs={12}>
          <Card className={classes.instructionscard}>
          <p><code>decode()</code> is a function that takes two integers <code>x</code> and <code>y</code> 
          and squares the maximum of the two. It then subtracts <code>x + y</code> from it and
          prints the result.</p>
                  <p>For example, <code>decode(2,3)</code> prints <code>"Result is: 1"</code>.</p>
                  <p>Here, x = 2 and y = 3. The maximum of 2 and 3 is 3.
                    The square of 3 is 3<sup>2</sup> = 6. Finally, 6 - (2 + 3) = 1.</p>
          <p>NOTE TO SELF: <b>Make sure the escapers don't find this!</b></p>
          </Card>
        </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Typography variant={'body1'}>Copy the lines of code into the
        editor to test them out. Each line is labeled with a number; keep
        track of the correct order of the numbers.</Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>1</Typography>
                if x >= y:
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>2</Typography>
                max = 0
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
                <Typography className={classes.cardnumber} variant={'body1'}>3</Typography>
                def decode(x,y):
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>4</Typography>
                max = x
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>5</Typography>
                else:
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>6</Typography>
                max = y
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>7</Typography>
                print("Result is: " + result)
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>8</Typography>
                maxSquared = max * max
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card className={classes.card}>
              <Typography className={classes.cardnumber} variant={'body1'}>9</Typography>
                result = maxSquared - (x + y)
              </Card>
            </Grid>
            </Grid>
          </div>
        </TabPanel>
    </div>
      </div>
    </DialogContent>
  );
}