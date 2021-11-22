import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import SocketAPI from './sockets/SocketAPI';
import { configureStore } from './store';
import App from './App';

const socketClient = new SocketAPI();
const store = configureStore({}, socketClient);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
