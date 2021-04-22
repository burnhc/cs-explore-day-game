import React, {Component} from 'react';
import ReactTerminal from 'react-terminal-component';
import { instructionstxt, datatxt, headtxt, linktxt, pathtxt, codepy } from './TerminalFileSystem';
import { EmulatorState, OutputFactory, CommandMapping,
         FileSystem, Outputs, defaultCommandMapping } from 'javascript-terminal';
import "./App.css";
import { InputAdornment, TextField, createMuiTheme,
         MuiThemeProvider, IconButton } from "@material-ui/core";
import { ArrowForwardRounded, Lock } from "@material-ui/icons";

class TerminalPuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unlocked: this.props.puzzle1Solved,
            passwordInput: '',
            passwordError: false
        };
        console.log(this.state.unlocked);
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
                '/TOP_SECRET_FOLDER/data.txt': {content: datatxt},
                '/TOP_SECRET_FOLDER/head.txt': {content: headtxt},
                '/TOP_SECRET_FOLDER/AnotherFolder/link.txt': {content: linktxt},
                '/TOP_SECRET_FOLDER/Folder2/path.txt': {content: pathtxt},
                '/TOP_SECRET_FOLDER/Folder2/Folder3/code.py': {content: codepy},
                '/TOP_SECRET_FOLDER/Folder2/Folder3/Folder4': {},
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
                <div
                    className={ this.state.unlocked ? 'hidden' : '' }
                    id={ 'computerPasswordPage' }>
                    <MuiThemeProvider theme={ terminalTheme }>
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
                    </MuiThemeProvider>
                </div>
                <div id={'terminal'} className={ this.state.unlocked ? '' : 'hidden' }>
                    <ReactTerminal
                        theme={{
                            background: '#141313',
                            promptSymbolColor: '#81EC0D',
                            commandColor: '#FFFFFF',
                            outputColor: '#FFFFFF',
                            errorOutputColor: '#FF0000',
                            fontSize: '1.35rem',
                            spacing: '1%',
                            height: '50vh',
                        }}
                        promptSymbol='user@exploreday$ '
                        emulatorState={ customState } />
                </div>
            </div>
        );
    }
}

export default TerminalPuzzle;