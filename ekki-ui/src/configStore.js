import { createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';
import history from './history';

const middllewares = [
  reduxThunk,
  routerMiddleware(history),
]

export default () => {
  let store = createStore(
    connectRouter(history)(rootReducer),
    {
      auth: { authenticated: localStorage.getItem('Token') }
    },
    applyMiddleware( ...middllewares ))
  return { store }
}