import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const DeleteIcon = (props) => {
    return (
        <CTooltip content="Delete">
            <FontAwesomeIcon
                className="text-danger"
                size="sm"
                icon={faTrash}
                {...props}
            />
        </CTooltip>
    )
}

export default DeleteIcon;