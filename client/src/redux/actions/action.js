import {FETCH_EXPENSES} from './actionTypes';
import {USER_LOGGING} from './actionTypes';
import {USER_LOGGED_OUT} from './actionTypes';
import {USER_REGISTRATION} from './actionTypes';
import {ADD_EXPENSE} from './actionTypes';
import {EDIT_EXPENSE} from './actionTypes';
import {DELETE_EXPENSE} from './actionTypes'

export const fetchExpenses = (token) =>{
    return {
        type:FETCH_EXPENSES,
        token
    }
}

export const userLogging = (email,password) =>{
    return {
        type:USER_LOGGING,
        email,password
    }
}

export const userRegistration = (username,email,password) => {
    return {
        type:USER_REGISTRATION,
        username,email,password
    }
}

export const userLoggedOut = () =>{
    return {
        type:USER_LOGGED_OUT,
    }
}

export const addExpense = (name,amount,category) =>{
    return {
        type:ADD_EXPENSE,
        name,amount,category
    }
}

export const editExpense = (_id,name,amount,category) =>{
    return {
        type:EDIT_EXPENSE,
        _id,name,amount,category
    }
}

export const deleteExpense = (_id) => {
    return {
        type:DELETE_EXPENSE,
        _id
    }
}