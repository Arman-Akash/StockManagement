import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import * as keys from '../axios/keys';
import * as storage from '../axios/storage';
// routes config
import routes, { outlet, warehouse } from '../routes'
import { Roles } from '../staticData';
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  var user = storage.loadState(keys.LOGGED_IN_USER);

  var authorizedRoute = [];

  if(user?.permissions == Roles.Outlet)
    authorizedRoute = outlet;
  else if(user?.permissions == Roles.Warehouse)
    authorizedRoute = warehouse;
  else if(user?.permissions == Roles.Admin)
  authorizedRoute = routes;


  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {authorizedRoute.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
