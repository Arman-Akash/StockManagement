import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import { Provider } from 'react-redux';
import store from './store';
import userManager, { loadUserFromStorage } from './views/Auth/UserService';
import AuthProvider from './views/Auth/utils/authProvider'
// import PrivateRoute from './views/Auth/utils/protectedRoute'

// React Notification
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Login = React.lazy(() => import('./views/Auth/Login'));
const SigninOidc = React.lazy(() => import('./views/Auth/signin-oidc'));
const SignoutOidc = React.lazy(() => import('./views/Auth/signout-oidc'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
const TheLayout = React.lazy(() => import('../src/containers/TheLayout'));

const App = () => {

  useEffect(() => {
    // fetch current user from cookies
    loadUserFromStorage(store)
  }, [])

  return (
    <>
      <Provider store={store}>
        <AuthProvider userManager={userManager} store={store}>
          <Router>
            <React.Suspense fallback={loading}>
              <Switch>
                <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                <Route exact path="/signin-oidc" name="Page 500" render={props => <SigninOidc {...props} />} />
                <Route exact path="/signout-oidc" name="Page 500" render={props => <SignoutOidc {...props} />} />
                <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
                {/* <Route path="/" name="protected route" render={props => <PrivateRoute {...props} />} /> */}
              </Switch>
            </React.Suspense>
          </Router>
        </AuthProvider>
      </Provider>
      <NotificationContainer />
    </>
  );
}
export default App;
