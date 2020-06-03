import {createStore ,applyMiddleware,compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer/rootReducer'
import rootSaga from './saga/saga'


// Initial State 
const initialState = "redux-saga"

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

// create store
const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

//Running middleware
sagaMiddleware.run(rootSaga)


export default store;