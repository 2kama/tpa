import { setUnapprovedUsers, setTraders } from '../../reducers/adminQuery'
import { getAllTraders, getUnapprovedUsers, approveUser } from '../requests/adminQueryUsers'
import { call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { setAlert } from '../../reducers/alerts'
import { enableButton } from '../../reducers/buttonState';

export function* handleGetUnapprovedUsers(action) {
    try {

        const users = yield call(getUnapprovedUsers)
        yield put(setUnapprovedUsers(
            users
        ))
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
    }
}

export function* handleGetTraders(action) {
    try {

        const users = yield call(getAllTraders)
        yield put(setTraders(
            users
        ))
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
    }
}

export function* handleApproveUser(action) {
    try {
        yield call(approveUser,  action.user)
        yield put(enableButton())
    } catch (err) {
        console.log(err.message)
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }
}
