import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "./Theme";

const LinkButton = (props) => {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        onClick,
        ...rest
    } = props

    return (
        <MuiThemeProvider theme={ mainTheme }>
        <Button
            {...rest}
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
            }}
        />
        </MuiThemeProvider>
    )
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)