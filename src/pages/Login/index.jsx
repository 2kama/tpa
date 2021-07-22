import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { getUser } from '../../store/reducers/user'
import Authenticate from '../../components/Authenticate'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
})

const Login = () => {

    const dispatch = useDispatch()

    const { buttonDisable, isAuthenticated, alertMessage, alertType } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable,
        isAuthenticated : state.user.isAuthenticated,
        alertMessage: state.alert.msg,
        alertType: state.alert.type
    }), shallowEqual)


    const submitForm = ({ email, password }) => {

        const userData = {
            email,
            password
        }

        dispatch(disableButton())
        dispatch(getUser(userData))

    }
    return(
        <>
            <div className={alertType==='success'? 'green' : 'red'}>{alertMessage}</div>
            <Authenticate inside={false} />
            {
                isAuthenticated !== undefined && !isAuthenticated && (
                    <>
                        <div>this is login page</div>
                        <Form
                            initialValues={{ email: "", password: ""}}
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

                            <SubmitButton title="login" disable={buttonDisable} />

                        </Form>
                    </>
                )
                }
        </>
    )
}

export default Login