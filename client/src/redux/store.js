import { createStore, applyMiddleware, combineReducers } from 'redux';
import userReducer from './Reducer/userReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const thunkMiddleware = require('redux-thunk').default;

const mainReducer = combineReducers({
	user: userReducer,
});

const store = createStore(mainReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;
