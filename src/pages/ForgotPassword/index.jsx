import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import Authenticate from '../../components/Authenticate'
import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { forgotPassword } from '../../store/reducers/user'
import Footer from '../../components/Footer'


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email")
})


const ForgotPassword = () => {

    const dispatch = useDispatch()

    const { buttonDisable, isAuthenticated, isLoading } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable,
        isAuthenticated : state.user.isAuthenticated,
        isLoading : state.isLoading
    }), shallowEqual)


    const submitForm = ({ email }) => {

            dispatch(disableButton())
            dispatch(forgotPassword(email))


    }


    return(
        <>
            <Authenticate inside={false} />

            {
                !isLoading && !isAuthenticated && (

                    <>
                    <div>this is forgot password page</div>

                    <Form
                        initialValues={{ email: "" }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField 
                            type="email"
                            name="email"
                            placeholder="youremail@mail.com"
                        />

                        <SubmitButton title="Send Reset Email" disable={buttonDisable} />

                    </Form>
                    </>

                )
            }

            <Footer />
        </>
    )
}


export default ForgotPassword