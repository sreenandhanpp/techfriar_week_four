import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    error:"",
    user:{}
}

export const updateUserReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.FETCH_USER_REQUEST:
            return { ...state, loading:true}
        case ADMIN.FETCH_USER_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case ADMIN.FETCH_USER_FAILED:
            return { ...state,loading: false,error: action.error }
        default:
            return state
    }
}

