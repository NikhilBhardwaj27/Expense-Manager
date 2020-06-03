const initialState = {
    message:null,
    token:'',
    isAuthenticated:false,
    userLoading:false,
    user:{}
}

const authReducer = (state = initialState,action) => {
    
    switch (action.type) {
        case 'USER_LOGGING':
            return {
                ...state,
                userLoading:true,
                message:null
            }
            
        case 'USER_LOGGING_SUCCESS':
            return {
                userLoading:false,
                isAuthenticated:true,
                message:null,
                token:action.payload2.token
            }
            
        case 'USER_LOGGING_FAIL':
            return {
                ...state,
                userLoading:false,
                isAuthenticated:false,
                message:action.payload2.message
            }
        
        case 'USER_LOGGED_OUT':
            return {
                message:null,
                token:'',
                isAuthenticated:false,
                userLoading:false
            }

        case 'USER_REGISTRATION':
            return {
                ...state,
                userLoading:true,
                message:null
            }
            
        case 'USER_REGISTRATION_SUCCESS':
            return {
                ...state,
                userLoading:false,
                isAuthenticated:true,
                message:null,
                user:action.payload2
            }
            
        case 'USER_REGISTRATION_FAIL':
            return {
                ...state,
                userLoading:false,
                isAuthenticated:false,
                message:action.payload2.message
            }
        default:
           return  state;
    }
}

export default authReducer;
