import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CRow,
    CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
//Icons
import iIndiaFlag from '../../assets/images/indiaFlag.png';
import iIndianNavy from '../../assets/images/indianNavy.png';
import iMyanmarFlag from '../../assets/images/myanmarFlag.png';
import iMyanmarNavy from '../../assets/images/myanmarNavy.jpg';
const Flag = (props) => {
    console.log(props)
    var country = props.match?.params?.country;
    console.log(country);
    var [flag, setFlag] = useState(null);
    var [flagNavy, setFlagNavy] = useState(null);

    useEffect(() => {
        if (props.match?.params.country == "india") {
            setFlag(iIndiaFlag);
            setFlagNavy(iIndianNavy);
        }
        if (props.match?.params.country == "myanmar") {
            setFlag(iMyanmarFlag);
            setFlagNavy(iMyanmarNavy);
        }
    }, [props.match?.params.country])

    return (
        <CCard>
            <CRow>
                <CCol md="6" className="text-left">
                    <CIcon style={{ width: '50px', height: '50px' }} src={flag} />
                </CCol>
                <CCol md="6" className="text-right">
                    <CIcon style={{ width: '50px', height: '50px' }} src={flagNavy} />
                </CCol>
            </CRow>
        </CCard>
    )
}

export default Flag;