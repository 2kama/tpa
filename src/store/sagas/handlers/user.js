import { call, put } from 'redux-saga/effects'
import { setUser } from '../../reducers/user'
import { requestGetUser, requestRegisterUser, requestGetUserPrivateData, requestLoginUser, requestVerifyUser, getUnapprovedUsers } from '../requests/user'
import { v4 as uuidv4 } from 'uuid'
import { enableButton } from '../../reducers/buttonState'
import { setAlert } from '../../reducers/alerts'
import { fetchUnapprovedUsers } from '../../reducers/unapprovedUser'

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

        yield call(requestRegisterUser.bind(null, action.userData))
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }
}

export function* handleLoginUser(action) {
    try {

        yield call(requestLoginUser.bind(null, action.userData))
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }
}


export function* handleVerifyUser(action) {
    try {

        yield call(requestVerifyUser)
        const alertData = {
            msg : "Verification mail has been sent to your Email Address",
            alertType : 'success',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }
}


export function* handleGetUnapprovedUsers(action) {
    try {

        const response = yield call(getUnapprovedUsers)
        yield put(fetchUnapprovedUsers(
            response
        ))
        
    } catch (err) {
        console.log(err)
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
    }
}