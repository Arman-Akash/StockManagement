import axios from 'axios'

export function setAuthHeader(token) {
  axios.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : ''
    // let userFromStorage = JSON.parse(localStorage.getItem("user"));
    // axios.defaults.headers.common['Authorization'] = userFromStorage.access_token
}