import { takeLatest } from "redux-saga/effects"
import { GET_USER, LOGIN_USER, REGISTER_USER, UPDATE_BANK, UPDATE_KIN, UPDATE_PASSWORD, UPDATE_USER, UPDATE_USER_BANK, VERIFY_BANK, VERIFY_USER } from "../constant"
import { handleUpdateBank, handleVerifyBank } from "./handlers/bankVerification"
import { handleGetUser, handleLoginUser, handleRegisterUser, handleUpdateKin, handleUpdatePassword, handleUpdateUser, handleUpdateUserBank, handleVerifyUser } from "./handlers/user"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(LOGIN_USER, handleLoginUser)
    yield takeLatest(VERIFY_USER, handleVerifyUser)
    yield takeLatest(UPDATE_USER, handleUpdateUser)
    yield takeLatest(UPDATE_KIN, handleUpdateKin)
    yield takeLatest(UPDATE_USER_BANK, handleUpdateUserBank)
    yield takeLatest(UPDATE_PASSWORD, handleUpdatePassword)
    yield takeLatest(VERIFY_BANK, handleVerifyBank)
    yield takeLatest(UPDATE_BANK, handleUpdateBank)
}