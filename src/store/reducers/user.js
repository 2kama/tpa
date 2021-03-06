import { ADD_LOG, ADD_NOTY, FORGOT_PASSWORD, GET_LOG, GET_TRANSACTION, GET_USER, 
    LOGIN_USER, REGISTER_USER, SEND_TRANSACTION, SET_ACCOUNT_NAME, SET_LOG, SET_USER, 
    UPDATE_KIN, UPDATE_PASSWORD, UPDATE_TRANSACTION, UPDATE_USER, UPDATE_USER_BANK, 
    UPDATE_WALLET, VERIFY_USER, SET_LOADING, SET_LOADED } from "../constant";



export const registerUser = (userData) => ({
    type: REGISTER_USER,
    userData
})

export const loginUser = (userData) => ({
    type: LOGIN_USER,
    userData
})

export const forgotPassword = (userEmail) => ({
    type: FORGOT_PASSWORD,
    userEmail
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

export const addNoty = (notyData) => ({
    type : ADD_NOTY,
    notyData
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

export const setAccName = (user) => ({
    type : SET_ACCOUNT_NAME,
    user
})

export const setLog = (user) => ({
    type : SET_LOG,
    user
})

export const getLog = (uid) => ({
    type : GET_LOG,
    uid
})

export const addLog = (logData) => ({
    type : ADD_LOG,
    logData
})

export const setIsLoading = () => ({
    type : SET_LOADING
})

export const setLoaded = () => ({
    type : SET_LOADED
})

export const sendTransaction = (transactionData) => ({
    type : SEND_TRANSACTION,
    transactionData
})

export const updateTransaction = (user) => ({
    type : UPDATE_TRANSACTION,
    user
})

export const updateWallet = (user) => ({
    type : UPDATE_WALLET,
    user
})

export const getTransaction = (uid) => ({
    type : GET_TRANSACTION,
    uid
})


const initialState = {
    isLoading : true
}

export default function user (state = initialState, action) {
    let { user } = action
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: true}
        case SET_LOADED:
                return {...state, isLoading: false}
        case SET_USER:
            return {
                ...state,
                ...user,
                isLoading: false
            };
        case SET_ACCOUNT_NAME:
            return {
                ...state,
                ...user,
                isLoading: false
            };
        case SET_LOG:
            return {
                ...state,
                log : [...user]
            };
        case UPDATE_TRANSACTION:
            return {
                ...state,
                walletTransactions : [...user]
            };
        case UPDATE_WALLET:
            return {
                ...state,
                wallet : {...user}
            }
        default:
            return state;
    }
}
