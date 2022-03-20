import React from 'react'
import { signinRedirect } from './UserService';
import { Redirect } from 'react-router-dom'

import { useSelector } from 'react-redux'

const Login = (props) => {
  const user = useSelector(state => state.auth.user)
  return (
    (user) ?
      (<Redirect to={props.location.state.redirectUrl} />)
      :
      (
        signinRedirect()
        // <CCard style={{ height: "100vh" }}>
        //   <CCardBody style={{ flex: "none", marginTop: "auto", marginBottom: "auto" }}>
        //     <div className="text-center align-middle">
        //       <h6 className="welcome">Welcome to </h6>
        //       <CImg src={logo} height="80" />
        //     </div>
        //     <div className="text-center mt-3">
        //       <button className="btn btn-success text-center" onClick={() => signinRedirect()}>Login</button>
        //     </div>
        //   </CCardBody>
        // </CCard>
      )
  )
}

export default Login
