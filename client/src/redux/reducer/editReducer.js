const initialState = {
    editLoading:false,
    message:{},
    success:false,
    delSuccess:false,
}

const editReducer = (state = initialState,action) =>{
    
    switch (action.type) {

        case 'EDIT_EXPENSE':
            return {
                ...state,
                editLoading:true,
                delSuccess:false,
                message:{}
            }    
        case 'EDIT_EXPENSE_SUCCESS':
            return {
                ...state,
                delSuccess:false,
                message:{},
                editLoading:false,
                success:true
            }  
        case 'EDIT_EXPENSE_FAIL':
            return {
                ...state,
                delSuccess:false,
                editLoading:false,
                message:action.payload,
                success:false
            }  
        case 'DELETE_EXPENSE':
            return {
               ...state,
               editLoading:false,
               message:{},
               success:false,
               delSuccess:false 
            }
            
        case 'DELETE_EXPENSE_SUCCESS':
            return {
               ...state,
               editLoading:false,
               message:{},
               success:false,
               delSuccess:true
            }
        default:
            return state
    }
}

export default editReducer;