import { setAlterUsers, setTraders } from '../../reducers/adminQuery'
import { getAllTraders, getUnapprovedUsers, alterUser } from '../requests/adminQueryUsers'
import { call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { setAlert } from '../../reducers/alerts'

export function* handleGetUnapprovedUsers(action) {
    try {

        const users = yield call(getUnapprovedUsers)
        yield put(setAlterUsers(
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

export function* handleAlterUser(action) {
    try {
        yield call(alterUser,  action.user)

        const alertData = {
            msg : `${action.user.firstName} ${action.user.lastName} has been approved`,
            alertType : 'success',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        
    } catch (err) {
        
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        
    }
}
