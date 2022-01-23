const initState = {
    isAuthenticated: false,
    loading:false
}

export const user = (state = initState, action) => {
    const { type, payload } = action;

    switch(type){
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
        case "LOGIN_BY_TOKEN":
        case "NEW_PASSWORD":
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case "LOGIN_BY_TOKEN_FAIL":
        case "NEW_PASSWORD_FAIL":
        case "LOG_OUT":
            localStorage.removeItem('token');
            console.log('from rediucer fail')
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false,
                user:null
            }
        
        case "SET_LOADER":
            return{
                ...state,
                loading: payload.status
            }

        default:
            return state;
    }
}