import { FETCH_UNAPPROVED_USERS, GET_UNAPPROVED_USERS } from '../constant';

export const setUnapprovedUsers = users => {
    return {
        type: FETCH_UNAPPROVED_USERS,
        users
    }
}

export const getUnapprovedUsers = () => ({
    type : GET_UNAPPROVED_USERS
})

const initState={
    users: []
}

export default function unapprovedUsers (state = initState, {type, users}) {
    switch (type) {
        case FETCH_UNAPPROVED_USERS:
            return {users};
        default:
            return state;
    }
}