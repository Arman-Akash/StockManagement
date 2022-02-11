import React, { useEffect } from 'react'
import { signinRedirectCallback } from './UserService';
import { useHistory } from 'react-router-dom'

const SigninOidc = () => {
  let history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback()
      history.push('/dashboard')
    }
    signinAsync()
  }, [history])

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default SigninOidc;
