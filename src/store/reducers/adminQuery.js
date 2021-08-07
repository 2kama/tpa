import { 
    FETCH_ALTER_USERS, 
    GET_UNAPPROVED_USERS, 
    GET_TRADERS, 
    SET_TRADERS,
    DELETE_USER_DATA,
    SELECT_ALTER_CONTENT,
    ALTER_USER,
    GET_USERS,
    GET_AFFILIATES,
    GET_ADMINS,
    GET_SUPER_ADMINS,
    GET_PENDING_TRANSACTIONS,
    SET_PENDING_TRANSACTIONS,
    GET_PROCESSED_TRANSACTIONS,
    SET_PROCESSED_TRANSACTIONS,
    SEND_TRANSACTION_RESPONSE,
    TRANSACTION_CHECKED
} from '../constant';

export const setAlterUsers = users => {
    return {
        type: FETCH_ALTER_USERS,
        users
    }
}

export const getUnapprovedUsers = () => ({
    type : GET_UNAPPROVED_USERS
})

export const getTraders = () => ({
    type : GET_TRADERS
    
})

export const getUsers = () => ({
    type : GET_USERS
    
})

export const getAffiliates = () => ({
    type : GET_AFFILIATES
    
})

export const getAdmins = () => ({
    type : GET_ADMINS
    
})

export const getSuperAdmins = () => ({
    type : GET_SUPER_ADMINS
    
})

export const alterUser = (user) => ({
    type : ALTER_USER,
    user
})

export const deleteUserData = (user) => ({
    type : DELETE_USER_DATA,
    user
})

export const setTraders = (users) => ({
    type : SET_TRADERS,
    users
})

export const setSelectedAlterContent = (user) => ({
    type : SELECT_ALTER_CONTENT,
    user
})

export const getPendingTransactions = () => ({
    type : GET_PENDING_TRANSACTIONS
})

export const setPendingTransactions = (transactions) => ({
    type : SET_PENDING_TRANSACTIONS,
    transactions
})

export const getProcessedTransactions = () => ({
    type : GET_PROCESSED_TRANSACTIONS
})

export const setProcessedTransactions = (transactions) => ({
    type : SET_PROCESSED_TRANSACTIONS,
    transactions
})

export const sendTransactionResponse = (transactionResponse) => ({
    type : SEND_TRANSACTION_RESPONSE,
    transactionResponse
})

export const transactionChecked = (transactions) => ({
    type : TRANSACTION_CHECKED,
    transactions
})

const initState={
    selectedAlterContent: {}
}

export default function adminQuery (state = initState, action) {
    switch (action.type) {
        case FETCH_ALTER_USERS:
            return {...state, alterUsers: action.users};
        case SET_TRADERS:
            return {...state, traders: action.users};
        case SELECT_ALTER_CONTENT:
            return {...state, selectedAlterContent: action.user};
        case TRANSACTION_CHECKED:
            return {
                ...state, 
                ...action.transactions
            };
        case SET_PROCESSED_TRANSACTIONS:
            return {...state, processedTransactions : action.transactions};
        case SET_PENDING_TRANSACTIONS:
            return {...state, pendingTransactions: action.transactions}
        default:
            return state;
    }
}