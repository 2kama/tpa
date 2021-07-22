import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import Authenticate from '../../components/Authenticate'
import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { loginUser } from '../../store/reducers/user'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
})


const Login = () => {

    const dispatch = useDispatch()

    const { buttonDisable, isAuthenticated } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable,
        isAuthenticated : state.user.isAuthenticated
    }), shallowEqual)


    const submitForm = ({ email, password }) => {

            const userData = {
                email,
                password
            }

            dispatch(disableButton())
            dispatch(loginUser(userData))


    }


    return(
        <>
            <Authenticate inside={false} />

            {
                isAuthenticated !== undefined && !isAuthenticated && (

                    <>
                    <div>this is Login page</div>




                    <Form
                        initialValues={{ email: "", password: "" }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField 
                            type="email"
                            name="email"
                            placeholder="youremail@mail.com"
                        />

                        <FormField 
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <SubmitButton title="Login" disable={buttonDisable} />

                    </Form>
                    </>

                )
            }


        </>
    )
}


export default Login