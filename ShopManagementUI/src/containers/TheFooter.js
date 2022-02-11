import React from 'react'
import { CFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react';
import logo from '../assets/laatahzan.png'

const today = new Date();

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; {today.getFullYear()} &nbsp;</span>
        Mansur Traders, <a style={{ textDecoration: "none" }} href="https://mansurtraders.co" target="_blank" rel="noopener noreferrer">M/S Mansur Traders</a>
        <span className="ml-1"></span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a style={{ textDecoration: "none" }} href="https://laatahzan.com" target="_blank" rel="noopener noreferrer">
          <CIcon src={logo} style={{ height: "15px" }} /> Laa Tahzan</a>
      </div>
    </CFooter >
  )
}

export default React.memo(TheFooter)
