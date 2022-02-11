import { UserManager } from 'oidc-client';
import { host, authority } from '../../config';
import { storeUser, storeUserError } from './actions/authActions';

const config = {
    authority: authority,
    client_id: "ThreatLibraryWebClient",
    redirect_uri: host + "/signin-oidc",
    response_type: "code",
    scope: "openid profile IDMSCoreApi IDMSClaims roles skoruba_identity_admin_api",
    post_logout_redirect_uri: host + "/signout-oidc",
};

const userManager = new UserManager(config)

export async function loadUserFromStorage(store) {
    try {
        let user = await userManager.getUser()
        if (!user) { return store.dispatch(storeUserError()) }
        store.dispatch(storeUser(user))
    } catch (e) {
        console.error(`User not found: ${e}`)
        store.dispatch(storeUserError())
    }
}

export function setUser() {
    userManager.getUser().then(function (user) {
        localStorage.setItem("user", JSON.stringify(user));
        // storeUser(user);
    })
}

export function getUserFromStorage() {
    return JSON.parse(localStorage.getItem("user"));
}

export function signinRedirect() {
    return userManager.signinRedirect()
}

export function signinRedirectCallback() {
    return userManager.signinRedirectCallback()
}

export async function signoutRedirect(id_token) {
    userManager.clearStaleState()
    userManager.removeUser()
    return window.location = config.authority + "/connect/endsession?id_token_hint=" + id_token + "&post_logout_redirect_uri" + config.post_logout_redirect_uri;
    // return userManager.signoutRedirect()
}

export function signoutRedirectCallback() {
    // localStorage.clear();
    userManager.clearStaleState()
    userManager.removeUser()
    return userManager.signoutRedirectCallback()
}

export default userManager
