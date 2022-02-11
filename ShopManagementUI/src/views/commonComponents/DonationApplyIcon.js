import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDonate, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const DonationApplyIcon = (props) => {
    return (
        <CTooltip content="Donation Apply">
            <FontAwesomeIcon
                className="text-warning"
                size="sm"
                icon={faDonate}
                {...props}
            />
        </CTooltip>
    )
}

export default DonationApplyIcon;