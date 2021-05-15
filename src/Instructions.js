import { React, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogActions, DialogContent, Divider, Typography } from '@material-ui/core';


class Instructions extends Component {
    render() {
        return(
            <Dialog
                disableScrollLock
                open={this.props.open}
                fullWidth
                maxWidth={ 'lg' }>
                <DialogTitle>
                    Instructions
                </DialogTitle>
                <DialogContent>
                    <Typography variant={'h5'}>Welcome to the CS Explore Day Escape Room.</Typography>
                    <Typography variant={'body1'} color={'textSecondary'}>Presented by ACM-W @ University of Washington</Typography>
                    <br/>
                    <Typography variant={'body1'}>Your team is currently trapped in
                        this strange room by the evil <b>Dr. Python</b>. Your goal is to escape
                        by solving a series of puzzles relating to computer science topics. If you fail to do
                        so, Dr. Python will keep you trapped in here forever!</Typography>
                    <br/>
                    <Typography variant={'h6'}>💡 Helpful Tips</Typography>
                    <ul>
                        <li><Typography variant={'body1'}>On the left side of the screen is a Python code editor. There, you can test
                    and run any code you might come across in the escape room.</Typography></li>
                    <li><Typography variant={'body1'}>Press on the 'Open Cheat Sheet' button at the bottom-right corner of the screen
                    for a quick reference on Python code. You can drag it around and resize it, too. To hide the cheat sheet, just press 'Close Cheat Sheet'.</Typography></li>
                    <li><Typography variant={'body1'}>Don't hesitate to ask the ACM-W facilitators if you have questions or get stuck! We're here to help.</Typography></li>
                    </ul>
                    <Typography variant={'h6'}>⛔ Please avoid refreshing the page, as you will lose all of your progress.</Typography>
                    <Typography variant={'h6'}>🔎 To begin, try exploring the objects in the room by clicking on them. Good luck!</Typography>
                </DialogContent>
                <DialogActions>
                <div id={'instructionsButton'}>
                        <Button
                            color={'secondary'}
                            variant={'contained'}
                            disableElevation
                            onClick={() => this.props.handleClose()}>Let's Begin</Button>
                    </div>
                </DialogActions>
        </Dialog>
        )
    }
}

export default Instructions;