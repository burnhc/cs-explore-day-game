import { Button, DialogContent, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const terminalTheme = createMuiTheme({
    typography: {
        fontFamily: 'Inconsolata',
        fontSize: 18
    },
    palette: {
        primary: { main: '#624e81' },
        secondary: { main: '#a0c3f3' },
      },
});

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        flexGrow: 1,
        height: '100%',
        width: '100%',
    },
    button: {
      marginTop: '15px',
      fontSize: '1rem',
      marginBottom: '20px',
  },
  }));

function DoorPuzzle() {
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();
    const classes = useStyles();


    const verifyPassword = () => {
        if (passwordInput === '103334536307411253') {
            history.push("/28s03n48ghg932vcmfknx");
        } else {
            setPasswordError(true);
        }
    }

    return (
        <div>
            <DialogContent>
                <MuiThemeProvider theme={ terminalTheme }>
                <Typography variant={'body1'}><code>x</code> is the correct order of the lines of code.</Typography>
                <br/>
                <Typography variant={'body2'}>
                 i.e. if the lines of code 1, 2, 3 had the correct order of 3, 2, 1, then <code>x</code> is the integer
                <code>321</code>.</Typography>
                <br/>
                <br/>
                <br/>
                <TextField
                    label="decode(x, 459)"  // x = 321456897
                    variant="outlined"
                    className={classes.input}
                    value={ passwordInput }
                    error={ passwordError }
                    onClick={() => { setPasswordError(false)}}
                    onChange={(e) => { setPasswordInput(e.target.value) }}>
                </TextField>
                </MuiThemeProvider>
                <Button
                    className={classes.button}
                    color={'primary'}
                    variant={'contained'}
                    disableElevation={true}
                    onClick={ verifyPassword }> 
                        Get us out of here!
                </Button>
            </DialogContent>
        </div>
    );
}

export default DoorPuzzle;