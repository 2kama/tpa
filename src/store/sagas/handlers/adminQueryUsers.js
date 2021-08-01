import { 
    getAllTraders, getUnapprovedUsers, alterUser, 
    deleteUnapprovedUser, getAllUsers, getAllAffiliates, getAllAdmins 
} from '../requests/adminQueryUsers'
import { setAlterUsers, setTraders, setLoaded } from '../../reducers/adminQuery'
import { call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { triggerAlert } from '../../reducers/alerts'
import { enableButton } from '../../reducers/buttonState'

export function* handleGetUnapprovedUsers(action) {
    try {
        const users = yield call(getUnapprovedUsers)
        yield put(setAlterUsers(
            users
        ))
        yield put(setLoaded())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
}

export function* handleGetTraders(action) {
    try {
        
        const users = yield call(getAllTraders)
        yield put(setTraders(
            users
            ))
            yield put(setLoaded())
        
        } catch (err) {
            const alertData = {
                msg : err.message,
                alertType : 'error',
                id: uuidv4(),
                timeout : 5000
            }
            yield put(triggerAlert(alertData))
        }
    }
    
    export function* handleGetUsers(action) {
        try {
            
            const users = yield call(getAllUsers)
            yield put(setAlterUsers(
                users
            ))
            yield put(setLoaded())
            
        } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
}

export function* handleGetAffiliates(action) {
    try {

        const users = yield call(getAllAffiliates)
        yield put(setAlterUsers(
            users
        ))
        yield put(setLoaded())
            
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
}

export function* handleGetAdmins(action) {
    try {

        const users = yield call(getAllAdmins)
        yield put(setAlterUsers(
            users
        ))
        yield put(setLoaded())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
}

export function* handleAlterUser(action) {
    try {
        yield call(alterUser,  action.user)
        const alertData = {
            msg : `${action.user.firstName} ${action.user.lastName} has been approved`,
            alertType : 'success',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
    yield put(enableButton())
}

export function* handleDeleteUnapprovedUser(action) {
    try {
        yield call(deleteUnapprovedUser,  action.user)
        const alertData = {
            msg : `${action.user.firstName} ${action.user.lastName} has been deleted`,
            alertType : 'success',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
    }
    yield put(enableButton())
}
