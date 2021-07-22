import { takeLatest } from "redux-saga/effects"
import { GET_USER, LOGIN_USER, REGISTER_USER, VERIFY_USER } from "../constant"
import { handleGetUser, handleLoginUser, handleRegisterUser, handleVerifyUser } from "./handlers/user"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(LOGIN_USER, handleLoginUser)
    yield takeLatest(VERIFY_USER, handleVerifyUser)
}