import {DialogContent} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

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
    height: 600,
  },
}));

export default function DrawerPuzzle() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DialogContent>
    <div className={classes.root}>
      <AppBar position="static" color="white" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="Paper 1" {...a11yProps(0)} disableRipple />
          <Tab label="Paper 2" {...a11yProps(1)} disableRipple />
        </Tabs>
      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
        <p>Looks like someone wrote a secret <code>decode()</code> function to unlock the door, but it's been scrambled out of order! All the code is in Paper 2. <b>Rewrite the code snippets in order so that the function works.</b> Keep track of the correct ordering; you'll need it to unlock the door, along with the function itself.</p>
        <div className="drawerPage">
        <p><code>decode()</code> takes a list of Morse code numbers as strings and performs the following operations:</p>
                <ol>
                    <li>It converts each Morse code number in the list into its decimal value as a string (e.g. <code>".----"</code> becomes <code>"1"</code>).</li>
                    <li>For every pair of numbers converted, it converts them into a letter from <code>"01"</code> = 'A' to <code>"26"</code> = 'Z'.</li>
                    <li>Each letter is concatenated together.</li>
                </ol>
                <p>The decoded result is returned as a string. If the Morse code cannot be converted, returns <code>None</code>.</p>
                <p>Example:</p>
                <p><code>decode(["-----",".----","-----",".----"])</code> returns <code>"AA"</code>.</p>
                <p>The Morse code numbers <code>"-----",".----","-----",".----"</code> convert to the decimal numbers 0, 1, 0, 1, so the pairs <code>"01" "01"</code> become <code>"AA"</code>.</p>
        </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <p>Each code snippet is labeled with a Morse code number (you don't need to convert them, but keep track of the right order). You can copy each code snippet into the Python editor.</p>
        <div className="drawerPage">{`# ".----"
for morseNum in morseCodeList:`}</div>
        <div className="drawerPage">{`# ".----"
def decode(morseCodeList):`}</div>
         <div className="drawerPage">{`# "-...."
if morseNum not in morseDictionary.keys() or len(morseCodeList) % 2 != 0:
\treturn None`}</div>
            <div className="drawerPage">{`# "-----"
decodedNum = morseDictionary[morseNum]
decodedPair += decodedNum`}</div>
            <div className="drawerPage">
{`# "....."
morseDictionary = {
\t"-----": "0",
\t".----": "1",
\t"..---": "2",
\t"...--": "3",
\t"....-": "4",
\t".....": "5",
\t"-....": "6",
\t"--...": "7",
\t"---..": "8",
\t"----.": "9"
}

decodedPair = ""
decodedResult = ""`}
</div>
            <div className="drawerPage">{`# ".----"
decodedLetter = chr(64 + int(decodedPair))  # converts decimal to letter character
decodedResult += decodedLetter
decodedPair = ""`}</div>
            <div className="drawerPage">{`# "....-"
return decodedResult`}</div>
            <div className="drawerPage">{`# "....."
if len(decodedPair) == 2:`}</div>
        </TabPanel>
    </div>
    </DialogContent>
  );
}