import { combineReducers } from 'redux'
import user from '../reducers/user'
import alerts from '../reducers/alerts'
import buttonState from './buttonState'
import unapprovedUsers from './unapprovedUser';

const rootReducer = combineReducers({
    user,
    alerts,
    buttonState,
    unapprovedUsers
})


export default rootReducer