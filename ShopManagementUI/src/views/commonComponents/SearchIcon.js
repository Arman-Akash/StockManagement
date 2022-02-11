import React from 'react'
///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CTooltip } from '@coreui/react';

const SearchIcon = (props) => {
    return (
        <CTooltip content="Search">
            <FontAwesomeIcon
                className="text-dark"
                size="sm"
                icon={faSearch}
                {...props}
            />
        </CTooltip>
    )
}

export default SearchIcon;