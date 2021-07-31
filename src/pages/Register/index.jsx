import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import Authenticate from '../../components/Authenticate'
import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormCheckBox, FormField, SubmitButton } from '../../components/Form'
import { registerUser } from '../../store/reducers/user'
import { useQuery } from '../../utils/query';


const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password"),
    passwordConfirmation: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match').label("Password Confirmation"),
    firstName: Yup.string().required().min(3).label("First Name"),
    lastName: Yup.string().required().min(3).label("Last Name"),
    phone: Yup.string().required().label("Phone Number"),
    terms: Yup.boolean().oneOf([true], 'Must accept Terms and Services')
})


const Register = () => {

    const termsText = "I agree to the terms and Conditions"

    const dispatch = useDispatch()
    const { query } = useQuery()

    const { buttonDisable, isAuthenticated, isLoading } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable,
        isAuthenticated : state.user.isAuthenticated,
        isLoading : state.isLoading
    }), shallowEqual)


    const submitForm = ({ email, password, passwordConfirmation, referralCode, firstName, lastName, phone }) => {

            const userData = {
                email,
                password,
                passwordConfirmation,
                referralCode,
                firstName,
                lastName,
                phone
            }

            dispatch(disableButton())
            dispatch(registerUser(userData))

        
    }


    return(
        <>
            <Authenticate inside={false} />

            {
                !isLoading && !isAuthenticated && (

                    <>
                        <div>this is Register page</div>

                        <Form
                            initialValues={{ firstName: "", lastName: "", phone: "", email: "", password: "", passwordConfirmation: "", referralCode: query.referralCode || "", terms : false }}
                            onSubmit={submitForm}
                            validationSchema={validationSchema}
                        >

                            <FormField 
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                            />

                            <FormField 
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                            />

                            <FormField 
                                type="email"
                                name="email"
                                placeholder="youremail@mail.com"
                            />

                            <FormField 
                                type="text"
                                name="phone"
                                placeholder="080-000-0000"
                            />


                            <FormField 
                                type="password"
                                name="password"
                                placeholder="Password"
                            />

                            <FormField 
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirm Password"
                            />

                            <FormField 
                                type="text"
                                name="referralCode"
                                placeholder="Affiliate Code [Optional]"
                            />

                            <FormCheckBox name="terms" text={termsText} />

                            <SubmitButton title="Register" disable={buttonDisable} />

                        </Form>
                    </>
                )
            }
        </>
    )
}


export default Register