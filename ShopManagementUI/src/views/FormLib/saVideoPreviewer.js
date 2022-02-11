//React & CoreUI
import React, { useRef } from 'react';
import {
    CCol,
    CRow
} from '@coreui/react';
import noVideo from '../../assets/images/noVideo.jpg';

/**
 * fileObj->mandatory
 * alt->optional
 * videoBoxStyle->optional
 * videoPlayerStyle->optional
 * videoPlayerDefaultStyle->optional
 */
const SAVideoPreviewer = ({ alt, fileObj, videoBoxStyle, videoPlayerStyle, videoPlayerDefaultStyle }) => {
    var previewer = null;
    var alt = alt !== undefined ? alt : "No vidoe available";
    if (fileObj !== null && fileObj !== undefined && fileObj !== '') {
        previewer = (
            <div className="embed-responsive embed-responsive-16by9" style={videoBoxStyle}>
                <video className="embed-responsive-item" style={videoPlayerStyle}
                    src={URL.createObjectURL(fileObj)} allowFullScreen controls={true}></video>
            </div>);
    } else {
        previewer = (<img src={noVideo} style={videoPlayerDefaultStyle} className="img-responsive" width="100%" alt={alt} />);
    }

    return (
        <>
            {previewer}
        </>
    );
}

export default SAVideoPreviewer;