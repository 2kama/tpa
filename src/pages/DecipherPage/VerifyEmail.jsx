import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { verifyUser } from '../../store/reducers/user'


const VerifyEmail = () => {


    const dispatch = useDispatch()

    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)


    const verifyEmail = () => {
        dispatch(verifyUser())
    }

    return(
        <>
            <div>Click to Verify your email</div>
            <button disabled={buttonDisable} onClick={e => verifyEmail()}>Click to Verify Email</button>
        </>
    )
}


export default VerifyEmail