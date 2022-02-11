import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const SearchIcon = (props) => {
    return (
        <CTooltip content="Select">
            <FontAwesomeIcon
                className="text-dark"
                size="sm"
                icon={faCheck}
                {...props}
            />
        </CTooltip>
    )
}

export default SearchIcon;