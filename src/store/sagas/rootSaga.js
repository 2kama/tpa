import { takeLatest } from "redux-saga/effects"
import { GET_USER, REGISTER_USER } from "../constant"
import { handleGetUser, handleRegisterUser } from "./handlers/user"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
}