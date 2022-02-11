import React from 'react';
import {
    CRow,
    CLabel,
    CCol
} from '@coreui/react';

//TagHelpers
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

/**
 * tagValues->mandatory
 * onChageTagValues->mandatory
 * lSize->mandatory
 * rSize->mandatory
 * label->optional
 * labelStyle->optional
 * 
 */
const SATagsInput = ({ labelStyle, label, lSize, rSize, tagValues, onChageTagValues,  ...props }) => {
    return (
        <CRow className="form-group">
            <CCol md={lSize}>
                <CLabel className={labelStyle}>{label}</CLabel>
            </CCol>
            <CCol md={rSize}>
                <TagsInput className="form-control height-auto" value={tagValues} onChange={onChageTagValues} disabled={props.isDisabled !== undefined ?props.isDisabled:false} />
            </CCol>
        </CRow>
    );
}

export default SATagsInput;