import { GET_USER, LOGIN_USER, REGISTER_USER, SET_USER, UPDATE_KIN, UPDATE_PASSWORD, UPDATE_USER, UPDATE_USER_BANK, VERIFY_USER } from "../constant";



export const registerUser = (userData) => ({
    type: REGISTER_USER,
    userData
})

export const loginUser = (userData) => ({
    type: LOGIN_USER,
    userData
})

export const verifyUser = () => ({
    type : VERIFY_USER
})

export const updateUser = (userData) => ({
    type : UPDATE_USER,
    userData
})

export const updateKin = (userData) => ({
    type : UPDATE_KIN,
    userData
})

export const updateUserBank = (userData) => ({
    type: UPDATE_USER_BANK,
    userData
})

export const updatePassword = (userData) => ({
    type: UPDATE_PASSWORD,
    userData
})

export const getUser = () => ({
    type : GET_USER
})

export const setUser = (user) => ({
    type : SET_USER,
    user
})


const initialState = {
    isLoading : true
}

export default function user (state = initialState, action) {
    let { user } = action
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...user,
                isLoading: false
            }
        default:
            return state;
    }
}
