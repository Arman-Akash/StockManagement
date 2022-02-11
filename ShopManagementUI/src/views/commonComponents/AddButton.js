import React from 'react'
import {
    CButton, CTooltip
} from '@coreui/react'

///Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';


/**
 * style
 * @param {*} props 
 */

const AddButton = (props) => {
    var buttonname = props.buttonname !== undefined ? props.buttonname : "Add";

    return (
        <CTooltip content={props.toolTipTitle !== undefined ? props.toolTipTitle : "Add"}>
            <CButton
                className="btn add-btn btn-sm float-right btn-circle"
                // style={{ ...addButtonStyle, ...props.style }}
                {...props}
            >
                <FontAwesomeIcon icon={faPlus} /> {buttonname}
            </CButton>
        </CTooltip>
    )
}
export default AddButton