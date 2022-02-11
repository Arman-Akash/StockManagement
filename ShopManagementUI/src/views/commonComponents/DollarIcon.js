import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const DollarIcon = (props) => {
    return (
        <CTooltip content="Rate">
            <FontAwesomeIcon
                className="text-warning"
                size="sm"
                icon={faDollarSign}
                {...props}
            />
        </CTooltip>
    )
}

export default DollarIcon;