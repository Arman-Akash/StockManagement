import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
const TheLayout = React.lazy(() => import('../../../containers/TheLayout'));

const ProtectedRoute = () => {
  const user = useSelector(state => state.auth.user)

  return (
    (user) ?
      (<Route path="/" name="Home" render={props => <TheLayout {...props} />} />)
      : (<Redirect to={{ pathname: '/login', state: { redirectUrl: window.location.pathname } }} />)
  )
}

export default ProtectedRoute