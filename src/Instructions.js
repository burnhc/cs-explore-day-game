import { React, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { DialogContent } from '@material-ui/core';


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
                    <p>asdfj</p>
                    <div id={'instructionsButton'}>
                        <Button
                            color={'secondary'}
                            variant={'contained'}
                            disableElevation
                            onClick={() => this.props.handleClose()}>Let's Begin</Button>
                    </div>
                </DialogContent>
        </Dialog>
        )
    }
}

export default Instructions;