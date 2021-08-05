import { call, put } from 'redux-saga/effects'
import { addLog, setLog, setUser, updateTransaction } from '../../reducers/user'
import { 
    requestGetUser, requestRegisterUser, 
    requestGetUserPrivateData, requestLoginUser, 
    requestVerifyUser, requestUpdateUser, 
    requestUpdateKin, requestUpdateUserBank, requestAddLog,
    reAuthUser, requestUpdatePassword, requestForgotPassword, requestUserNoty, requestAddNoty, requestGetLog, requestSendTransaction, requestGetTransaction 
} from '../requests/user'
import { v4 as uuidv4 } from 'uuid'
import { enableButton } from '../../reducers/buttonState'
import { triggerAlert } from '../../reducers/alerts'
import { thousands_separators, TIME_ZONE } from '../../../utils/helperFunctions'



export function* handleGetUser(action) {
    try {

        const response = yield call(requestGetUser)
        const response2 = yield call(requestGetUserPrivateData)
        const response3 = yield call(requestUserNoty)
        yield put(setUser({
            ...response.data(),
            ...response2.data(),
            ...response3.data(),
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
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        
    }
    yield put(enableButton())
}

export function* handleLoginUser(action) {
    try {
        
        yield call(requestLoginUser.bind(null, action.userData))
        
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


export function* handleAddNoty(action) {
    try {

        yield call(requestAddNoty, action.notyData)
        
    } catch (err) {
        console.log(err.message)
    }
}


export function* handleForgotPassword(action) {
    try {

        yield call(requestForgotPassword, action.userEmail)

        const alertData = {
            msg : "A reset email has been successfully sent to your Email",
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


export function* handleVerifyUser(action) {
    try {

        yield call(requestVerifyUser)
        const alertData = {
            msg : "Verification mail has been sent to your Email Address",
            alertType : 'success',
            id: uuidv4(),
            timeout : 8000
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


export function* handleUpdateUser(action) {
    try {
        yield call(requestUpdateUser.bind(null, action.userData))
        const alertData = {
            msg : "Profile has been updated",
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


export function* handleUpdateKin(action) {
    try {
        yield call(requestUpdateKin.bind(null, action.userData))
        const alertData = {
            msg : "Next of Kin Info has been updated",
            alertType : 'success',
            id: uuidv4(),
            timeout : 4000
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



export function* handleUpdateUserBank(action) {
    try {
        yield call(requestUpdateUserBank.bind(null, action.userData))
        const alertData = {
            msg : "Banking Details have been updated",
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


export function* handleGetLog(action) {

    if(action.uid !== undefined) {
        try {

            const response = yield call(requestGetLog, action.uid)
            yield put(setLog(response.data().log))
            
            
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
    
}


export function* handleAddLog(action) {
    try {

        yield call(requestAddLog, action.logData)
        
    } catch (err) {
        
    }
}


export function* handleUpdatePassword(action) {
    try {

        yield call(reAuthUser.bind(null, action.userData.password))

        try {

            yield call(requestUpdatePassword.bind(null, action.userData.newPassword))

            const alertData = {
                msg : "Password has been Updated",
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
        
    } catch (err) {

        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 8000
        }
        yield put(triggerAlert(alertData))
        
    }
    yield put(enableButton())
}



export function* handleGetTransaction(action) {

    if(action.uid !== undefined) {

        try {
            const data = yield call(requestGetTransaction, action.uid)
            yield put(updateTransaction(data))

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

}



export function* handleSendTransaction(action) {

    const { transactionData } = action

    try {
        const reference = `Tx-${uuidv4()}`
        const time = new Date().getTime() + TIME_ZONE

        const mTranctionData = {
            reference,
            txType : transactionData.txType,
            uid : transactionData.uid,
            amount : transactionData.amount,
            receipt : transactionData.receipt,
            reason : "",
            status : "sending",
            time
        }

        const setInfo = () => {

            switch (transactionData.type) {
                case "credit":
                    return `You made a credit transaction [${reference}] of ${thousands_separators(transactionData.amount.toFixed(2))}`;
                case "debit":
                    return `You made a debit request [${reference}] of ${thousands_separators(transactionData.amount.toFixed(2))}`;
                default:
                    return "nothing"
            }

        }

        const logData = {
            time,
            uid : transactionData.uid,
            info : setInfo()
        }

        yield call(requestSendTransaction, mTranctionData)
        yield call(addLog, logData)
        yield put(updateTransaction(transactionData.walletTransactions.length > 0 ? [mTranctionData, ...transactionData.walletTransactions] : [mTranctionData]))


        const alertData = {
            msg : 'Transaction was Successfully Submitted',
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
            timeout : 8000
        }
        yield put(triggerAlert(alertData))
    }
    yield put(enableButton())

}
