import { 
    FETCH_UNAPPROVED_USERS, 
    GET_UNAPPROVED_USERS, 
    GET_TRADERS, 
    SET_TRADERS, 
    SELECT_UNAPPROVED_USER,
    APPROVE_USER
} from '../constant';

export const setUnapprovedUsers = users => {
    return {
        type: FETCH_UNAPPROVED_USERS,
        users
    }
}

export const getUnapprovedUsers = () => ({
    type : GET_UNAPPROVED_USERS
})

export const getTraders = () => ({
    type : GET_TRADERS
    
})

export const approveUser = (user) => ({
    type : APPROVE_USER,
    user
})

export const setTraders = (users) => ({
    type : SET_TRADERS,
    users
})

export const setSelectedUnApprovedUser = (user) => ({
    type : SELECT_UNAPPROVED_USER,
    user
})

const initState={
    unapprovedUsers: [],
    traders: [],
    selectedUnapprovedUser: {}
}

export default function adminQuery (state = initState, action) {
    switch (action.type) {
        case FETCH_UNAPPROVED_USERS:
            return {...state, unapprovedUsers: action.users};
            case SET_TRADERS:
                return {...state, traders: action.users};
            case SELECT_UNAPPROVED_USER:
                return {...state, selectedUnapprovedUser: action.user}
        default:
            return state;
    }
}