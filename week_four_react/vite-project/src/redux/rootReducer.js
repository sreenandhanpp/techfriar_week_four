import { combineReducers } from 'redux'
import { userReducer } from './reducers/signupReducer'
import { logoutReducer } from './reducers/logoutReducer'
import { loginReducer } from './reducers/loginReducer'
import { fetchUserReducer } from './reducers/fetchUsersReducer'
import { updateUserReducer } from './reducers/updateUserReducer'
import { deleteUserReducer } from './reducers/deleteUserReducer'
import { CreateUserReducer } from './reducers/CreateUserReducer'





export const rootReducers = combineReducers({
    userData: userReducer,
    logout:logoutReducer,
    login:loginReducer,
    Users:fetchUserReducer,
    user:updateUserReducer,
    delete:deleteUserReducer,
    CreatedUser:CreateUserReducer
})

