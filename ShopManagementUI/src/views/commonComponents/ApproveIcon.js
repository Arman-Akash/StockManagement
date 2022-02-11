import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const ApproveIcon = (props) => {
    return (
        <CTooltip content={props.content !== undefined? props.content:'Approved'}>
            <FontAwesomeIcon
                className="text-success"
                size="sm"
                icon={faCheck}
                {...props}
            />
        </CTooltip>
    )
}

export default ApproveIcon;