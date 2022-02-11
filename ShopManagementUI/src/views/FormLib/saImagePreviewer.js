//React & CoreUI
import React, { useRef } from 'react';
import {
    CCol,
    CRow
} from '@coreui/react';
import noImage from '../../assets/images/noImage.jpg';

/**
 * fileObj-> mandatory
 * imgStyle->optional
 * alt->optional
 * lSize->optional
 * rSize->optional
 * imgBoxStyle->optional
 */
const SAImagePreviewer = ({fileObj, imgStyle, alt, lSize, rSize, imgBoxStyle}) => {
    var previewer = null;
    var alt=null;
    alt = alt !== undefined ? alt : "No image available";
    if (fileObj !== null && fileObj !== undefined && fileObj !== '') {
        previewer = (
            <img src={URL.createObjectURL(fileObj)} className="img-responsive" width="100%" style={imgStyle} alt={alt} />
        );
    } else {
        previewer = (
            <img src={noImage} className="img-responsive" width="100%" style={imgStyle} alt={alt} />
        );
    }

    return (
        <CRow>
            <CCol md={lSize}></CCol>
            <CCol md={rSize} style={imgBoxStyle}>
                {previewer}
            </CCol>
        </CRow>
    );
}

export default SAImagePreviewer;