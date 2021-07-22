import { FETCH_UNAPPROVED_USERS, GET_UNAPPROVED_USERS } from '../constant';

export const fetchUnapprovedUsers = users => ({
    type: FETCH_UNAPPROVED_USERS,
    users
})

export const getUnapprovedUsers = () => ({
    type : GET_UNAPPROVED_USERS
})

export default function unapprovedUsers (state = [], action) {
    switch (action.type) {
        case FETCH_UNAPPROVED_USERS:
            return action.users;
        default:
            return state;
    }
}