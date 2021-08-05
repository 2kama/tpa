import { 
    getAllTraders, getUnapprovedUsers, alterUser, 
    deleteUserData, getAllUsers, getAllAffiliates, getAllAdmins, requestGetPendingTransactions, requestGetProcessedTransactions, requestSendTransactionResponse 
} from '../requests/adminQueryUsers'
import { setAlterUsers, setTraders, setPendingTransactions, setProcessedTransactions, transactionChecked } from '../../reducers/adminQuery'
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

export function* handleDeleteUserData(action) {
    try {
        yield call(deleteUserData,  action.user)
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


export function* handleGetPendingTransactions(action) {


    try {

        const pendingTransactions = yield call(requestGetPendingTransactions)
        yield put(setPendingTransactions(pendingTransactions))
        
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


export function* handleGetProcessedTransactions(action) {


    try {

        const processedTransactions = yield call(requestGetProcessedTransactions)
        yield put(setProcessedTransactions(processedTransactions))
        
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


export function* handleSendTransactionResponse(action) {

    const { data, pendingTransactions, processedTransactions } = action.transactionResponse

    try {

        yield call(requestSendTransactionResponse, data)

        yield put(transactionChecked(
             {
                 processedTransactions : processedTransactions.length > 0 ? [data, ...processedTransactions] : [data],
                 pendingTransactions : pendingTransactions.filter(transaction => transaction.reference !== data.reference)
             }
            
            
            ))

        const alertData = {
            msg : `Transaction was sucessfully ${data.status}`,
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
