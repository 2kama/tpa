import { GET_USER, REGISTER_USER, SET_USER, SIGNIN_USER } from "../constant";

export const registerUser = (userData) => ({
    type: REGISTER_USER,
    userData
})

export const signInUser = (userData) => ({
    type: SIGNIN_USER,
    user: userData
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
        case SIGNIN_USER:
            return {
                email: user.email,
                isLoading: true
            }
        default:
            return state;
    }
}
