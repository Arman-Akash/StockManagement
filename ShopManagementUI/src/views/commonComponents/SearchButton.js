import React from 'react'
import {
    CButton,
    CTooltip
} from '@coreui/react'

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';


/**
 * style
 * @param {*} props 
 */

const addButtonStyle = {
    marginTop: '5px',
    height: '85%'
};

const SearchButton = (props) => {
    return (
        <CTooltip content={props.tooltiptitle !== undefined ? props.tooltiptitle : "Search"}>
            <CButton
                className="btn btn-info verticalMiddleInButton btn-circle"
                style={{ ...addButtonStyle, ...props.style }}
                {...props}
            >
                <FontAwesomeIcon style={{ marginLeft: '41%' }} icon={faSearch} />
            </CButton>
        </CTooltip>
    )
}
export default SearchButton;