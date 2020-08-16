import { combineReducers } from 'redux';

import airDataReducer from './airDataReducers';
import indexLevelReducer from './indexLevelReducers';

const airApp = combineReducers({ airData: airDataReducer, indexLevel: indexLevelReducer });

export default airApp;
