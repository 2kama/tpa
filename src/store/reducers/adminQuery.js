import { 
    FETCH_ALTER_USERS, 
    GET_UNAPPROVED_USERS, 
    GET_TRADERS, 
    SET_TRADERS,
    DELETE_UNAPPROVED_USER,
    SELECT_ALTER_USER,
    ALTER_USER,
    GET_USERS,
    GET_AFFILIATES,
    GET_ADMINS,
    GET_SUPER_ADMINS,
    SET_LOADED,
    SET_LOADING
} from '../constant';

export const setIsLoading = () => ({
    type : SET_LOADING
})

export const setLoaded = () => ({
    type : SET_LOADED
})

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
    selectedAlterUser: {},
    isLoading: false
}

export default function adminQuery (state = initState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {...state, isLoading: true}
        case SET_LOADED:
                return {...state, isLoading: false}
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