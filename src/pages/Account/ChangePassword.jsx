import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { updatePassword } from '../../store/reducers/user'



const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(6).label("Current Password"),
    newPassword: Yup.string().required().min(6).label("New Password"),
    passwordConfirmation: Yup.string().required().oneOf([Yup.ref('newPassword'), null], 'New Passwords must match').label("New Password Confirmation"),
})


const ChangePassword = () => {


    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)

    const dispatch = useDispatch()


    const submitForm = ({ password, newPassword }) => {

        const userData = {
            password,
            newPassword
        }

        dispatch(disableButton())
        dispatch(updatePassword(userData))

    }



    return(
        <>


                <Form
                        initialValues={{ 
                            password : "",
                            newPassword : "",
                            passwordConfirmation : ""
                        }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField 
                            type="password"
                            name="password"
                            placeholder="Password"
                            label="Current Password"
                            icon="unlock-alt"
                        />

                        <FormField 
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            label="New Password"
                            icon="unlock-alt"
                        />

                        <FormField 
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm New Password"
                            label="Confirm Password"
                            icon="unlock-alt"
                        />


                    <SubmitButton title="Update Password" disable={buttonDisable} />

                    </Form>


        </>
    )
}


export default ChangePassword