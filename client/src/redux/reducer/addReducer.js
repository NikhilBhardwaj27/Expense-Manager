const initialState = {
    addLoading:false,
    message:{},
    success:false
}
const addReducer = (state = initialState,action) =>{
    
    switch (action.type) {

        case 'ADD_EXPENSE':
            return {
                ...state,
                addLoading:true,
                message:{}
            }    
        case 'ADD_EXPENSE_SUCCESS':
            return {
                ...state,
                message:{},
                addLoading:false,
                success:true
            }  
        case 'ADD_EXPENSE_FAIL':
            return {
                ...state,
                addLoading:false,
                message:action.payload,
                success:false
            }  

        default:
            return state
    }
}

export default addReducer;