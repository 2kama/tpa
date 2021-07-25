import { VERIFY_BANK, VERIFIED_BANK, REMOVE_VERIFY, UPDATE_BANK } from '../constant'


export const verifiedBank = (bankData) => ({
    type: VERIFIED_BANK,
    bankData
})


export const verifyBank = (bankData) => ({
    type: VERIFY_BANK,
    bankData
})

export const removeVerify = () => ({
    type: REMOVE_VERIFY
})

export const updateBank = (bankData) => ({
    type: UPDATE_BANK,
    bankData
})


const initialState = {
    bankName : "",
    accountName : "",
    accountNumber : "",
    bankVerificationAPI : false
}


export default function user (state = initialState, action) {
    let { bankData } = action
    switch (action.type) {
        case VERIFIED_BANK:
            return {
                ...state,
                ...bankData
            };
        case VERIFY_BANK:
            return {
                ...state,
                bankVerificationAPI : false
            };
        case REMOVE_VERIFY:
            return {
                ...initialState
            }
        default:
            return state;
    }
}