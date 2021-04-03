import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class Prompt extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onBackdropClick={() => this.props.handleClose()}
                fullWidth
                maxWidth={this.props.maxWidth || 'md'}>
                <DialogTitle>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>{this.props.title}</Box>
                        <Box>
                            <IconButton onClick={() => this.props.handleClose()}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                {this.props.componentToOpen}
            </Dialog>
        )
    }
}

export default Prompt;