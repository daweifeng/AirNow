import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import ReactGA from 'react-ga';


import './index.css';
import App from './App';
import airApp from './reducers/index';
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const rootEl = document.getElementById('root');
ReactGA.initialize('UA-128591856-2');
ReactGA.pageview(window.location.pathname + window.location.search);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleWare(airApp)}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootEl
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();