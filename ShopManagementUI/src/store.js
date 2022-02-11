// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: 'responsive'
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return {...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { createStore, compose } from 'redux';
import rootReducer from './views/Auth/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers()
)

export default store;