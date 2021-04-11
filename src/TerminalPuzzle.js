import React, {Component} from 'react';
import ReactTerminal from 'react-terminal-component';
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
                '/instructions.txt': {
                    content: 'Figure out the password by searching for hidden clues in this computer.\n' +
                        'The SecretFolder/ might be a good place to start...',
                    canModify: false},
                '/SecretFolder': {},
                '/SecretFolder/AnotherFolder/secret.txt': {content: 'The password is: oogabooga'},
            }),
            'commandMapping': CommandMapping.create({
                ...defaultCommandMapping,
                'help': {
                    'function': () => {
                        return {
                            output: OutputFactory.makeTextOutput(
                                "TIPS: All commands are case-sensitive.\n" +
                                "      Press UP/DOWN arrow keys to cycle through your command history.\n\n" +
                                "Command    Description\n" +
                                "-----------------------------------------------------------------------------------------------\n" +
                                "cat        Use 'cat [fileName.txt]' to show the contents of a file.\n" +
                                "cd         Use 'cd /[folderName]' to go into a folder. Use 'cd ./' to go back.\n" +
                                "head       Use 'head -n [n] [fileName.txt]' to show the first n lines of a file.\n" +
                                "help       Use 'help' to show the available terminal commands.\n" +
                                "ls         Use 'ls' to show the files in the folder you're in.\n" +
                                "pwd        Use 'pwd' to show the path of the folder you're in.\n" +
                                "tail       Use 'tail -n [n] [fileName.txt]' to show the last n lines of a file.\n"
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
                "This a tool that programmers use to interact with the computer.\n\n" +
                "Enter 'help' for a list of available commands.\n\n"
          )
        );

        const customState = defaultState.setOutputs(newOutputs);
        
        const color = "#fff";
        const terminalTheme = createMuiTheme({
            typography: {
                fontFamily: 'monospace',
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
                <div className={ this.state.unlocked ? '' : 'hidden' }>
                    <ReactTerminal
                        theme={{
                            background: '#141313',
                            PuzzlePromptSymbolColor: '#81EC0D',
                            commandColor: '#81EC0D',
                            outputColor: '#FFFFFF',
                            errorOutputColor: '#FF0000',
                            fontSize: '1.1rem',
                            spacing: '1%',
                            fontFamily: 'monospace',
                            height: '50vh',
                        }}
                        PuzzlePromptSymbol='> '
                        emulatorState={ customState } />
                </div>
            </div>
        );
    }
}

export default TerminalPuzzle;