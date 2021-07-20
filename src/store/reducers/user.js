import { GET_USER, SET_USER } from "../constant";

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
    switch (action.type) {
        case SET_USER:
            const { user } = action;
            return {
                ...state,
                user,
                isLoading: false
            }
        default:
            return state;
    }
}