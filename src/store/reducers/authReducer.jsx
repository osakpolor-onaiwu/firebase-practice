const initialState = {
    authError:null
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':{
            console.log('login error')
            return{
                ...state,
                authError:'login failed'
            }
        }

        case 'LOGIN_SUCCESS':{
            console.log('login success')
            return{
                ...state,
                authError:null
            }
        }

        case 'SIGNOUT_SUCCESS':{
            console.log('signout success');
            return state
        }

        case 'SIGNUP_SUCCESS':{
            console.log('signUP sucess')
            return{
                ...state,
                authError:null
            }
        }

        case 'SIGNUP_ERROR':{
            return{
                ...state,
                authError:action.err.message
            }
        }
        //note: action.err.message will output the error that happend

        default: return state
    }
};
export default authReducer;
//we set authError to null in the initial state because d user has not entered anything yet, 
//we also set it to null when the login was successful becasue there is no error when it is successful only if it failed