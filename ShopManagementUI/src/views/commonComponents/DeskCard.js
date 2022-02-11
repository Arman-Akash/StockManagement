import CIcon from '@coreui/icons-react'
import { CLink } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import { Screens } from '../../staticData'
import { Authorize } from '../Auth/AuthService'

const DeskCard = ({ link, roles, title, icon }) => {
    return (
        <div className={`text-center oms-icon}`} >
            <CLink to={link}>
                <CIcon src={icon} />
                <h6 className="icon-name">{title}</h6>
            </CLink>
        </div>

    )
}

export default DeskCard;