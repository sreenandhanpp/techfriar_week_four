import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    data:{}
}

export const fetchUserReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.FETCH_USERS_REQUEST:
            return { ...state, loading:true}
        case ADMIN.FETCH_USERS_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case ADMIN.FETCH_USERS_FAILED:
            return { ...state,loading: false,error: action.error }
        default:
            return state
    }
}

