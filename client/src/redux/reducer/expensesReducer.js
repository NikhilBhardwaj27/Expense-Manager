const initialState = {
    expenses:[],
    loading:false,
    message:{}
}

const expensesReducer = (state = initialState,action) =>{
    
    switch (action.type) {

        case 'FETCH_EXPENSES':
            return {
                ...state,
                loading:true
            }    
        case 'FETCH_EXPENSES_SUCCESS':
            return {
                ...state,
                loading:false,
                expenses:action.payload
            }  
        case 'FETCH_EXPENSES_FAIL':
            return {
                ...state,
                loading:false,
                message:action.payload
            }  
        default:
            return state
    }
}

export default expensesReducer
