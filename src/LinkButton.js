import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';

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
        <Button
            {...rest}
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
            }}
        />
    )
}

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default withRouter(LinkButton)