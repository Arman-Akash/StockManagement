import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const ConfirmButton = (props) => {
    return (
        <CTooltip content="Confirm">
            <FontAwesomeIcon
                className="text-danger"
                size="sm"
                icon={faCheckSquare}
                {...props}
            />
        </CTooltip>
    )
}

export default ConfirmButton;