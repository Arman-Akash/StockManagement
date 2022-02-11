import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const EditIcon = (props) => {
    return (
        <CTooltip content="Edit">
            <FontAwesomeIcon
                className="text-warning"
                size="sm"
                icon={faEdit}
                {...props}
            />
        </CTooltip>
    )
}

export default EditIcon;