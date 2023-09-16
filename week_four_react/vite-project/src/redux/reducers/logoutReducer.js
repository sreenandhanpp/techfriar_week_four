import { USER } from "../constants/user"
import  {removeItem}  from '../../../localStorage/removeItem'

let initialState = {
    loading:false,
    error:"",
}

export const logoutReducer = (state = initialState,action) => {
    switch(action.type){
        case USER.LOGOUT_REQUEST:
            return { ...state, loading:true}
        case USER.LOGOUT_SUCCESS:
            removeItem('user');
            return { ...state,loading: false }
        case USER.LOGOUT_FAILED:
            return { ...state,loading: false,error: "Logout failed" }
        default:
            return state
    }
}