import { combineReducers } from 'redux';

import airDataReducer from './airDataReducers';

const airApp = combineReducers({ airData: airDataReducer });

export default airApp;
