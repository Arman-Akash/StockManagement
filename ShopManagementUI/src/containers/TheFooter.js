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
        <a style={{ textDecoration: "none" }} href="https://mansurtraders.co" target="_blank" rel="noopener noreferrer">
        <span style=
        {{fontWeight:'bold', color:'#2F3292'}}>M/S. Mansur Traders</span></a>
        <span className="ml-1"></span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a style={{ textDecoration: "none" }} href="https://laatahzanbd.com" target="_blank" rel="noopener noreferrer">
          <CIcon src={logo} style={{ height: "15px" }} /> <span style=
          {{fontWeight:'bold', color:'#01B763'}}>Laa Tahzan</span></a>
      </div>
    </CFooter >
  )
}

export default React.memo(TheFooter)
