import { delay, put } from 'redux-saga/effects'
import { setAlert, removeAlert } from '../../reducers/alerts'


export function* handleAlert (action) {
    yield put(setAlert(action.alertData))

    yield delay(action.alertData.timeout)

    yield put(removeAlert(action.alertData.id))

    
}