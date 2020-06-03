import {createStore ,applyMiddleware} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/rootReducer'
import rootSaga from './saga/saga'


// Initial State 
const initialState = "redux-saga"

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware()

// create store
const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(sagaMiddleware)))

//Running middleware
sagaMiddleware.run(rootSaga)


export default store;