import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import socketMiddleware from './sockets/socketMiddleware';

import rootReducer from './reducers/root_reducer';

const configureStoreProd = (preloadedState = {}, socketClient) => 
  createStore(
    rootReducer,
    applyMiddleware(thunk, socketMiddleware(socketClient))
  );

const configureStoreDev = (preloadedState = {}, socketClient) => 
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk, socketMiddleware(socketClient)),
    )
  );

export const configureStore = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') ? configureStoreProd : configureStoreDev;