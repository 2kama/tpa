import { combineReducers } from 'redux'
import user from '../reducers/user'
import alerts from '../reducers/alerts'
import buttonState from './buttonState'

const rootReducer = combineReducers({
    user,
    alerts,
    buttonState
})


export default rootReducer