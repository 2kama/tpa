import { takeLatest } from "redux-saga/effects"
import { GET_USER, REGISTER_USER, SIGNIN_USER } from "../constant"
import { handleGetUser, handleRegisterUser, handleSignin } from "./handlers/user"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(SIGNIN_USER, handleSignin)
}