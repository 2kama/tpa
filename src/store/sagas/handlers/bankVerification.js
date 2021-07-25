import { call, put } from 'redux-saga/effects'
import { v4 as uuidv4 } from 'uuid'
import { enableButton } from '../../reducers/buttonState'
import { setAlert } from '../../reducers/alerts'
import { requestUpdateBank, requestVerifyBank } from '../requests/bankVerification'
import { removeVerify, verifiedBank } from '../../reducers/bankVerification'
import { setAccName } from '../../reducers/user'



export function* handleVerifyBank (action) {

    try {

        const response = yield call(requestVerifyBank.bind(null, action.bankData))
        const { data } = response

        yield put(verifiedBank({
            ...action.bankData, 
            accountName : data.account_name === undefined ? "" : data.account_name,
            bankVerificationAPI : data.account_name === undefined ? false : true
        }))
        
        if(data.account_name === undefined) {
            const alertData = {
                msg : "Invalid Account Details",
                alertType : 'error',
                id: uuidv4()
            }
            yield put(setAlert(alertData))
            yield put(enableButton())
        }
        
    } catch (err) {
        const alertData = {
            msg : "There was an error",
            alertType : 'error',
            id: uuidv4()
        }
        yield put(setAlert(alertData))
        yield put(enableButton())
    }

}


export function* handleUpdateBank (action) {
    try {

        yield call(requestUpdateBank.bind(null, action.bankData))
        yield put(removeVerify())
        yield put(setAccName({accountName : action.bankData.accountName}))


        const alertData = {
            msg : "Bank Detials Updated Successfully",
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