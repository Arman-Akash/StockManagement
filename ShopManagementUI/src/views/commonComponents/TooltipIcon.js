import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CTooltip } from '@coreui/react';

const TooltipIcon = (props) => {
    return (
        <CTooltip content={props.content}>
            <FontAwesomeIcon
                size="sm"
                icon={props.icon}
                {...props}
            />
        </CTooltip>
    )
}

export default TooltipIcon;