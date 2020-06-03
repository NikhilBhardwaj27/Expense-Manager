import {call,put,takeEvery,all} from 'redux-saga/effects';
import axios from 'axios';
import {
    FETCH_EXPENSES_FAIL,
    USER_LOGGING,
    USER_LOGGING_SUCCESS,
    USER_LOGGING_FAIL,
    USER_REGISTRATION,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
    FETCH_EXPENSES_SUCCESS,
    ADD_EXPENSE,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_FAIL,
    EDIT_EXPENSE,
    EDIT_EXPENSE_SUCCESS,
    EDIT_EXPENSE_FAIL,
    DELETE_EXPENSE_SUCCESS,
    DELETE_EXPENSE
} from '../../redux/actions/actionTypes'

const token = localStorage.getItem('token')

// Generator Function for fetching Expenses of logged-in Users
function* fetchExpenses(token){
    
    if(token.token){
        try {
            const payload1 = yield call(axios.get,'/routes/api/expenses',{
                    headers:{
                        'auth-token':token.token
                    }
                })
                axios.defaults.headers.common['auth-token'] = localStorage.getItem('token')
                const payload = payload1.data
                yield put({type:FETCH_EXPENSES_SUCCESS,payload})
            }catch(e){
                console.log(e)
            }
    }else {
        try{
           const payload1 = yield call(axios.get,'/routes/api/expenses')
                const payload = payload1.data
                yield put({type:FETCH_EXPENSES_FAIL,payload})
            }catch(e){
                console.log(e)
            }
    }
    
}

// Watcher to watch for fetchExpenses generator functions
function* watchFetchExpenses(){
    yield takeEvery('FETCH_EXPENSES',fetchExpenses)
}


// Generator Function for user-login-authentication 
function* userLogging(payload){
    try {
        const email = payload.email
        const password = payload.password
        const payload1 = yield call(axios.post,'/routes/api/user-login',{            
            method: 'POST',
            body:JSON.stringify({email,password}),
            headers: { 'Content-type': 'application/json' }
        })
        const payload2 = payload1.data

        //if logging success else fail 
        if(!payload2.message){
            localStorage.setItem('token',payload2.token)
            yield put({type:USER_LOGGING_SUCCESS,payload2})
        }else {
            yield put({type:USER_LOGGING_FAIL,payload2})
        }

    }catch(e){
        console.log(e)
    }
}

// Watcher to watch for User Login generator functions
function* watchUserLogging(){
    yield takeEvery(USER_LOGGING,userLogging)
}


// Generator Function for user-login-authentication 
function* userRegistration(payload){

    const username = payload.username
    const email = payload.email
    const password = payload.password
    try {

        const payload1 = yield call(axios.post,'/routes/api/new-user/register',{
            method: 'POST',
            body:JSON.stringify({username,email,password}),
            headers: { 'Content-type': 'application/json' }      
        })

        const payload2 = payload1.data

        //if register success else fail 
        if(!payload2.message){
            localStorage.removeItem('token')
            yield put({type:USER_REGISTRATION_SUCCESS,payload2})
        }else {
            yield put({type:USER_REGISTRATION_FAIL,payload2})
        }

    } catch (err) {
        console.log(err)
    }
}

// Watcher to watch for User Registration generator functions
function* watchUserRegistration(){
    yield takeEvery(USER_REGISTRATION,userRegistration)
}


// Generator Function for adding expense 
function* addExpense(data){

    console.log(data)
    const ItemName = data.name;
    const ItemAmount = data.amount;
    const ItemCategory = data.category;

    try {
        const payload1 = yield call(axios.post,'/routes/api/expenses/add-expense',{
            method:'POST',
            body:JSON.stringify({ItemName,ItemAmount,ItemCategory})
            })

        const payload = payload1.data

        if(payload.message){
            yield put({type:ADD_EXPENSE_FAIL,payload})
        }else {
            yield put({type:'FETCH_EXPENSES',token:token})
            yield put({type:ADD_EXPENSE_SUCCESS})
        }

    }catch(err){
        console.log(err)
    }
}

// Watcher to watch for Add expense generator functions
function* watchAddExpense(){
    yield takeEvery(ADD_EXPENSE,addExpense)
}


// Generator Function for editing expense
function* editExpense(data){

    const _id  = data._id
    const ItemName = data.name;
    const ItemAmount = data.amount;
    const ItemCategory = data.category;

    try {
        const payload1 = yield call(axios.patch,'/routes/api/expenses/update',{
            method:'PATCH',
            body:JSON.stringify({_id,ItemName,ItemAmount,ItemCategory})
            })

        const payload= payload1.data
        if(payload.message){
            yield put({type:EDIT_EXPENSE_FAIL,payload})
        }else {
            yield put({type:'FETCH_EXPENSES',token:token})
            yield put({type:EDIT_EXPENSE_SUCCESS})
            
        }

    }catch(err){
        console.log(err)
    }
}

// Watcher to watch for Edit expense generator functions
function* watchEditExpense(){
    yield takeEvery(EDIT_EXPENSE,editExpense)
}


// Generator Function for deleting expense
function* deleteExpense(data){
    const id  = data._id
    console.log(id)
    try {
        yield call(axios.delete,'/routes/api/expenses/delete',{
            headers:{
                'id':id
            }
        })
            
            yield put({type:'FETCH_EXPENSES',token:token})
            yield put({type:DELETE_EXPENSE_SUCCESS})
    }catch(err){
        console.log(err)
    }
}
// Watcher to watch for Delete expense generator functions
function* watchDeleteExpense(){
    yield takeEvery(DELETE_EXPENSE,deleteExpense)
}
// root saga
export default function* rootSaga (){
    yield all([
        watchFetchExpenses(),
        watchUserLogging(),
        watchUserRegistration(),
        watchAddExpense(),
        watchEditExpense(),
        watchDeleteExpense()
    ])
}