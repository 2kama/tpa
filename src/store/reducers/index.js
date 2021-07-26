import { combineReducers } from 'redux'
import user from '../reducers/user'
import alerts from '../reducers/alerts'
import buttonState from './buttonState'
import adminQuery from './adminQuery';
import bankVerification from './bankVerification'

const rootReducer = combineReducers({
    user,
    alerts,
    buttonState,
    adminQuery,
    bankVerification
})


export default rootReducer