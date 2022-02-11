import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const ViewIcon = (props) => {
    return (
        <CTooltip content="View">
            <FontAwesomeIcon
                className="text-info"
                size="sm"
                icon={faEye}
                {...props}
            />
        </CTooltip>
    )
}

export default ViewIcon;