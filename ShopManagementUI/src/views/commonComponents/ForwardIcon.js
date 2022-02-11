import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faForward } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const ForwardIcon = (props) => {
    return (
        <CTooltip content="Forward">
            <FontAwesomeIcon
                className="text-warning"
                size="sm"
                icon={faForward}
                {...props}
            />
        </CTooltip>
    )
}

export default ForwardIcon;