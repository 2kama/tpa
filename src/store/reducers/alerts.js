import { SET_ALERT, REMOVE_ALERT, TRIGGER_ALERT } from '../constant'


export const triggerAlert = (alertData) => ({
    type: TRIGGER_ALERT,
    alertData
})

export const setAlert = (alertData) => ({
    type: SET_ALERT,
    alertData
})

export const removeAlert = (alertData) => ({
    type: REMOVE_ALERT,
    alertData
})



export default function alerts(state=[], action) {
    const {type, alertData} = action
    
    switch (type) {
        case SET_ALERT:
            return [...state, alertData];
        case REMOVE_ALERT:
            return state.filter(({id}) => id !== alertData);
        default:
            return state;
    }
}