import { 
    FETCH_ALTER_USERS, 
    GET_UNAPPROVED_USERS, 
    GET_TRADERS, 
    SET_TRADERS,
    DELETE_UNAPPROVED_USER,
    SELECT_ALTER_USER,
    ALTER_USER
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

export const alterUser = (user) => ({
    type : ALTER_USER,
    user
})

export const deleteUnapprovedUser = (user) => ({
    type : DELETE_UNAPPROVED_USER,
    user
})

export const setTraders = (users) => ({
    type : SET_TRADERS,
    users
})

export const setSelectedAlterUser = (user) => ({
    type : SELECT_ALTER_USER,
    user
})

const initState={
    alterUsers: [],
    traders: [],
    selectedAlterUser: {}
}

export default function adminQuery (state = initState, action) {
    switch (action.type) {
        case FETCH_ALTER_USERS:
            return {...state, alterUsers: action.users};
            case SET_TRADERS:
                return {...state, traders: action.users};
            case SELECT_ALTER_USER:
                return {...state, selectedAlterUser: action.user}
        default:
            return state;
    }
}