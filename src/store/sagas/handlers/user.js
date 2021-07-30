import { call, put } from 'redux-saga/effects'
import { setUser } from '../../reducers/user'
import { 
    requestGetUser, requestRegisterUser, 
    requestGetUserPrivateData, requestLoginUser, 
    requestVerifyUser, requestUpdateUser, 
    requestUpdateKin, requestUpdateUserBank, 
    reAuthUser, requestUpdatePassword, requestForgotPassword, requestUserNoty, requestAddNoty 
} from '../requests/user'
import { v4 as uuidv4 } from 'uuid'
import { enableButton } from '../../reducers/buttonState'
import { triggerAlert } from '../../reducers/alerts'



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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
}

export function* handleLoginUser(action) {
    try {
        
        yield call(requestLoginUser.bind(null, action.userData))
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
    }
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
        yield put(enableButton())
        
    } catch (err) {
        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 5000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
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
            yield put(enableButton())
            
        } catch (err) {

            const alertData = {
                msg : err.message,
                alertType : 'error',
                id: uuidv4(),
                timeout : 5000
            }
            yield put(triggerAlert(alertData))
            yield put(enableButton())
            
        }
        
    } catch (err) {

        const alertData = {
            msg : err.message,
            alertType : 'error',
            id: uuidv4(),
            timeout : 8000
        }
        yield put(triggerAlert(alertData))
        yield put(enableButton())
        
    }
}
