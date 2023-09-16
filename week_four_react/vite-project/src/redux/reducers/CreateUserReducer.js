import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
}

export const CreateUserReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.CREATE_USER_REQUEST:
            return { ...state, loading:true}
        case ADMIN.CREATE_USER_SUCCESS:
            return { ...state,loading: false }
        case ADMIN.DELETE_USER_FAILED:
            return { ...state,loading: false,error: action.error }
        default:
            return state
    }
}

