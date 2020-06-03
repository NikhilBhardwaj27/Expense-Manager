import {combineReducers} from 'redux'
import expenseReducer from './expensesReducer'
import authReducer from './authReducer'
import addReducer from './addReducer'
import editReducer from './editReducer'

// Root reducers
const rootReducer = combineReducers({
    expenses:expenseReducer,
    auth:authReducer,
    addReducer:addReducer,
    editReducer:editReducer
})

export default rootReducer;