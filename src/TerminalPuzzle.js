import React, {Component} from 'react';
import ReactTerminal from 'react-terminal-component';
import { instructionstxt, datatxt, linktxt, pathtxt, codepy } from './TerminalFileSystem';
import { EmulatorState, OutputFactory, CommandMapping,
         FileSystem, Outputs, defaultCommandMapping } from 'javascript-terminal';
import "./App.css";
import { InputAdornment, TextField, createMuiTheme,
         MuiThemeProvider, IconButton, Box } from "@material-ui/core";
import { ArrowForwardRounded, Lock } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";

class TerminalPuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unlocked: this.props.puzzle1Solved,
            passwordInput: '',
            passwordError: false
        };
    }

    verifyPassword() {
        if (this.state.passwordInput !== 'HelloWorld3') {
            this.setState({
                passwordError: true
            })
        } else {
            this.setState({
                passwordError: false,
                unlocked: true
            })
            this.props.puzzle1();
        }
    }

    render() {
        const defaultState = EmulatorState.create({
            'fs': FileSystem.create({
                '/': {canModify: false},
                '/instructions.txt': {content: instructionstxt},
                '/TOP_SECRET_FOLDER/encrypted.txt': {content: datatxt},
                '/TOP_SECRET_FOLDER/FOLDER1/link.txt': {content: linktxt},
                '/TOP_SECRET_FOLDER/FOLDER2/password.txt': {content: pathtxt},
                '/TOP_SECRET_FOLDER/FOLDER2/code.py': {content: codepy},
            }),
            'commandMapping': CommandMapping.create({
                ...defaultCommandMapping,
                'help': {
                    'function': () => {
                        return {
                            output: OutputFactory.makeTextOutput(
                                "\nCOMMAND    DESCRIPTION  (replace [] with your file/folder name)\n" +
                                "------------------------------------------------------------------------------------\n" +
                                "cat        Use 'cat [fileName]' to show the contents of a file.\n" +
                                "cd         Use 'cd [folderName]' to open a folder. Use 'cd ..' to go back.\n" +
                                "ls         Use 'ls' to list the files in the folder you're in.\n" +
                                "pwd        Use 'pwd' to show the path of the folder you're in.\n" +
                                "head       Use 'head -n [x] [fileName]' to show the first x lines of a file.\n" +
                                "tail       Use 'tail -n [x] [fileName]' to show the last x lines of a file.\n" +
                                "help       Use 'help' to show the available commands (you just did this).\n\n" +
                                "* For simplicity, you should be in the same folder as the file you want to use.\n\n" +
                                "TIPS: Commands are case-sensitive.\n" +
                                "      Use UP/DOWN arrow keys to cycle through your command history.\n" +
                                "      Use TAB to autocomplete commands.\n\n"
                            )
                        };
                    },
                    'optDef': {}
                }
            })
        });

        const defaultOutputs = defaultState.getOutputs();
        const newOutputs = Outputs.addRecord(
            defaultOutputs, OutputFactory.makeTextOutput(
                "Welcome to the computer terminal.\n" +
                "This a tool that programmers use to interact with the computer.\n" +
                "Type commands next to the $ and execute them by pressing ENTER.\n\n" +
                "Let's get started...\n" +
                "1. List the files in your current folder:            ls\n" +
                "2. See the contents of the file 'instructions.txt':  cat instructions.txt\n" +
                "3. Open the folder 'TOP_SECRET_FOLDER/':             cd TOP_SECRET_FOLDER\n" +
                "4. Check the folder you're in:                       pwd\n\n" +
                "Type 'help' to see other useful commands and tips! :)\n\n"
          )
        );

        const customState = defaultState.setOutputs(newOutputs);
        
        const color = "#fff";
        const terminalTheme = createMuiTheme({
            typography: {
                fontFamily: 'Inconsolata',
                fontSize: 18
            },
            palette: {
                primary: { main: color },
                secondary: { main: color },
                grey: { main: color }
            },
            overrides: {
                MuiOutlinedInput: {
                    root: {
                        position: "relative",
                        "& $notchedOutline": {
                            borderColor: color
                        },
                        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
                            borderColor: color,
                            "@media (hover: none)": {
                                borderColor: color
                            }
                        },
                        "&$focused $notchedOutline": {
                            borderColor: color,
                            borderWidth: 1
                        }
                    }
                },
                MuiFormLabel: {
                    root: {
                        color: color
                    }
                }
            }
        });
        

        return (
            <div>
                <MuiThemeProvider theme={ terminalTheme }>
                <div id={"terminaltop"} position="fixed">
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>Computer Terminal</Box>
                        <Box>
                            <IconButton
                                id={"terminalexitbutton"}
                                color={"primary"}
                                size={"small"}
                                disableRipple
                                onClick={() => this.props.handleClose()}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </div>
                <div
                    className={ this.state.unlocked ? 'hidden' : '' }
                    id={ 'computerPasswordPage' }>
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            value={ this.state.passwordInput }
                            error={ this.state.passwordError }
                            autoFocus
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                                style: { color: this.state.passwordError ? 'red' : 'white' }
                            }}
                            onChange={(e) => {
                                this.setState({ passwordInput: e.target.value });
                                this.value = this.state.passwordInput;
                            }}
                            onClick={() => this.setState({ passwordError: false })}
                            onKeyPress={(e) =>
                                e.key === 'Enter' ? this.verifyPassword() : ''}>
                        </TextField>
                        <IconButton
                            onClick={() => { this.verifyPassword() }}
                            color={"primary"}>
                            <ArrowForwardRounded />
                        </IconButton>
                </div>
                <div id={'terminal'} className={ this.state.unlocked ? '' : 'hidden' }>
                    <ReactTerminal
                        theme={{
                            background: '#141313',
                            promptSymbolColor: '#81EC0D',
                            commandColor: '#FFFFFF',
                            outputColor: '#FFFFFF',
                            errorOutputColor: '#FF0000',
                            fontSize: '1rem',
                            spacing: '1%',
                            height: '93vh',
                        }}
                        promptSymbol='user@csexploreday$ '
                        emulatorState={ customState } />
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default TerminalPuzzle;