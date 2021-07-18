import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { getUser, setUser } from '../store/reducers/user'
import firebase from 'firebase'


const Authenticate = ({ inside }) => {

    const dispatch = useDispatch()
    const auth = firebase.auth()

    const AuthUser = () => {
        auth.onAuthStateChanged(user => {
            
            if(user) {
                dispatch(getUser())
            }else {
                dispatch(setUser({ 
                    isAuthenticated : false
                 }))
            }
            
        })
    }


    useEffect(() => {
        AuthUser()
    },[])



    const { isLoading, isAuthenticated } = useSelector(state => ({
        isLoading : state.isLoading,
        isAuthenticated : state.user.isAuthenticated
    }), shallowEqual)


    return(
        <>
            {
                !isLoading && (
                    inside ? 
                        (isAuthenticated ? <></> : <Redirect to="/login" />) :
                        (isAuthenticated ? <Redirect to="/dashboard" /> : <></>)
                )
            }
        </>
    )
}


export default Authenticate