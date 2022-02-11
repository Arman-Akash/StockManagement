//React & CoreUI
import React, { useRef } from 'react';
import noDocument from '../../assets/images/noDocument.png';

/**
 * fileObj->mandatory
 * alt->optional
 * documentBoxStyle->optional
 * documentPlayerStyle->optional
 * documentPlayerDefaultStyle->optional
 */
const SADocumentPreviewer = ({ alt, fileObj, documentBoxStyle, documentViewerStyle, documentViewerDefaultStyle }) => {
    var previewer = null;
    var alt = alt !== undefined ? alt : "No vidoe available";
    if (fileObj !== null && fileObj !== undefined && fileObj !== '') {
        previewer = (
            <div className="embed-responsive embed-responsive-16by9" style={documentBoxStyle}>
                <iframe className="embed-responsive-item" style={documentViewerStyle}
                    src={URL.createObjectURL(fileObj)} allowFullScreen controls={true}></iframe>
            </div>);
    } else {
        previewer = (<img src={noDocument} style={documentViewerDefaultStyle} className="img-responsive" width="100%" alt={alt} />);
    }

    return (
        <>
            {previewer}
        </>
    );
}

export default SADocumentPreviewer;