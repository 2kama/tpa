import { takeLatest } from "redux-saga/effects"
import { GET_USER, LOGIN_USER, REGISTER_USER, VERIFY_USER, GET_UNAPPROVED_USERS, GET_TRADERS } from "../constant"
import { handleGetUser, handleLoginUser, handleRegisterUser, handleVerifyUser } from "./handlers/user"
import { handleGetUnapprovedUsers, handleGetTraders} from "./handlers/adminQueryUsers"


export function*  watcherSaga() {
    yield takeLatest(GET_USER, handleGetUser)
    yield takeLatest(REGISTER_USER, handleRegisterUser)
    yield takeLatest(LOGIN_USER, handleLoginUser)
    yield takeLatest(VERIFY_USER, handleVerifyUser)
    yield takeLatest(GET_UNAPPROVED_USERS, handleGetUnapprovedUsers)
    yield takeLatest(GET_TRADERS, handleGetTraders)
}