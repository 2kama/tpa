import { combineReducers } from 'redux'
import user from '../reducers/user'
import alerts from '../reducers/alerts'
import buttonState from './buttonState'
<<<<<<< HEAD
import adminQuery from './adminQuery';
=======
import bankVerification from './bankVerification'
>>>>>>> a9a9f23933490c155e9a8a73cab9fcdad84665df

const rootReducer = combineReducers({
    user,
    alerts,
    buttonState,
<<<<<<< HEAD
    adminQuery
=======
    bankVerification
>>>>>>> a9a9f23933490c155e9a8a73cab9fcdad84665df
})


export default rootReducer