import { DISABLE_BUTTON, ENABLE_BUTTON } from "../constant";



export const disableButton = () => ({
    type : DISABLE_BUTTON
})

export const enableButton = () => ({
    type : ENABLE_BUTTON
})


const initialState = {
    buttonDisable : false
}

export default function buttonState (state = initialState, action) {
    switch (action.type) {
        case DISABLE_BUTTON:
            return {
                ...state,
                buttonDisable: true
            }
        case ENABLE_BUTTON:
            return {
                ...state,
                buttonDisable: false
            }
        default:
            return state;
    }
}
