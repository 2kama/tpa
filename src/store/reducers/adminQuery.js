import { FETCH_UNAPPROVED_USERS, GET_UNAPPROVED_USERS, GET_TRADERS, SET_TRADERS } from '../constant';

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

export const setTraders = (users) => ({
    type : SET_TRADERS,
    users
})

const initState={
    unapprovedUsers: [],
    traders: []
}

export default function adminQuery (state = initState, {type, users}) {
    switch (type) {
        case FETCH_UNAPPROVED_USERS:
            return {...state, unapprovedUsers: users};
            case SET_TRADERS:
            return {...state, traders: users};
        default:
            return state;
    }
}