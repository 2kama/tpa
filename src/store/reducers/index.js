import { combineReducers } from 'redux'
import user from '../reducers/user'
import alerts from '../reducers/alerts'
import buttonState from './buttonState'
import bankVerification from './bankVerification'

const rootReducer = combineReducers({
    user,
    alerts,
    buttonState,
    bankVerification
})


export default rootReducer