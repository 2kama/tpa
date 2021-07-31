import { takeLatest, takeEvery } from "redux-saga/effects"
import { 
    handleGetUnapprovedUsers, handleGetTraders, handleAlterUser,
    handleDeleteUnapprovedUser, handleGetUsers, handleGetAffiliates,
    handleGetSuperAdmins, handleGetAdmins
} from "./handlers/adminQueryUsers"
import { 
    GET_UNAPPROVED_USERS, GET_USER, LOGIN_USER, 
    GET_ADMINS, GET_SUPER_ADMINS, GET_AFFILIATES, GET_USERS,
    REGISTER_USER, UPDATE_BANK, UPDATE_KIN, 
    UPDATE_PASSWORD, UPDATE_USER, UPDATE_USER_BANK, 
    VERIFY_BANK, VERIFY_USER, GET_TRADERS, DELETE_UNAPPROVED_USER,
    ALTER_USER, 
    TRIGGER_ALERT,
    FORGOT_PASSWORD,
    ADD_NOTY,
    GET_LOG,
    ADD_LOG
} from "../constant"
import { handleUpdateBank, handleVerifyBank } from "./handlers/bankVerification"
import { 
    handleAddLog,
    handleAddNoty,
    handleForgotPassword,
    handleGetLog,
    handleGetUser, handleLoginUser, handleRegisterUser, 
    handleUpdateKin, handleUpdatePassword, handleUpdateUser, 
    handleUpdateUserBank, handleVerifyUser 
} from "./handlers/user"
import { handleAlert } from "./handlers/alerts"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(LOGIN_USER, handleLoginUser)
    yield takeLatest(VERIFY_USER, handleVerifyUser)
    yield takeLatest(GET_UNAPPROVED_USERS, handleGetUnapprovedUsers)
    yield takeLatest(GET_USERS, handleGetUsers)
    yield takeLatest(GET_AFFILIATES, handleGetAffiliates)
    yield takeLatest(GET_ADMINS, handleGetAdmins)
    yield takeLatest(GET_SUPER_ADMINS, handleGetSuperAdmins)
    yield takeLatest(GET_TRADERS, handleGetTraders)
    yield takeEvery(DELETE_UNAPPROVED_USER, handleDeleteUnapprovedUser)
    yield takeEvery(ALTER_USER, handleAlterUser)
    yield takeLatest(UPDATE_USER, handleUpdateUser)
    yield takeLatest(UPDATE_KIN, handleUpdateKin)
    yield takeLatest(UPDATE_USER_BANK, handleUpdateUserBank)
    yield takeLatest(UPDATE_PASSWORD, handleUpdatePassword)
    yield takeLatest(VERIFY_BANK, handleVerifyBank)
    yield takeLatest(UPDATE_BANK, handleUpdateBank)
    yield takeEvery(TRIGGER_ALERT, handleAlert)
    yield takeLatest(FORGOT_PASSWORD, handleForgotPassword)
    yield takeEvery(ADD_NOTY, handleAddNoty)
    yield takeLatest(GET_LOG, handleGetLog)
    yield takeLatest(ADD_LOG, handleAddLog)
}