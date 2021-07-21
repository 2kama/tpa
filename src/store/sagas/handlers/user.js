import { call, put } from 'redux-saga/effects'
import { setUser } from '../../reducers/user'
import { requestGetUser, requestRegisterUser, requestGetUserPrivateData } from '../requests/user'
import { v4 as uuidv4 } from 'uuid'
import { enableButton } from '../../reducers/buttonState'
import { setAlert } from '../../reducers/alerts'

export function* handleGetUser(action) {
    try {

        const response = yield call(requestGetUser)
        const response2 = yield call(requestGetUserPrivateData)
        yield put(setUser({
            ...response.data(),
            ...response2.data(),
            isAuthenticated : true
        }))


        
        
    } catch (err) {
        console.log(err)
    }
}


export function* handleRegisterUser(action) {
    try {

        const response = yield call(requestRegisterUser(action.userData))
        const alertData = {
            msg : "Successfully Registered",
            alertType : "success",
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.code,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }
}