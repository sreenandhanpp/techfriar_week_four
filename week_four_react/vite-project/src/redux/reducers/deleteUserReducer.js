import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
}

export const deleteUserReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.DELETE_USER_REQUEST:
            return { ...state, loading:true}
        case ADMIN.DELETE_USER_SUCCESS:
            return { ...state,loading: false, }
        case ADMIN.DELETE_USER_FAILED:
            return { ...state,loading: false, }
        default:
            return state
    }
}

