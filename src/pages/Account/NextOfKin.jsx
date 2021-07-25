import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { updateKin } from '../../store/reducers/user'



const validationSchema = Yup.object().shape({
    kinFirstName: Yup.string().required().min(3).label("First Name"),
    kinLastName: Yup.string().required().min(3).label("Last Name"),
    KinPhone: Yup.string().required().label("Phone Number")
})


const NextOfKin = ({ user }) => {

    const[editable, toggleEdit] = useState(false)

    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)

    const dispatch = useDispatch()


    const submitForm = ({ kinFirstName, kinLastName, kinMiddleName, KinPhone }) => {

        const userData = {
            kinFirstName,
            kinLastName,
            kinMiddleName,
            KinPhone
        }

        dispatch(disableButton())
        dispatch(updateKin(userData))

    }



    const {kinFirstName, kinLastName, kinMiddleName, KinPhone} = user

    return(
        <>
            <h4>Next of Kin</h4>


                <Form
                        initialValues={{ 
                            kinFirstName, 
                            kinLastName, 
                            kinMiddleName, 
                            KinPhone
                        }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField 
                            type="text"
                            name="kinFirstName"
                            placeholder="First Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="kinLastName"
                            placeholder="Last Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="kinMiddleName"
                            placeholder="Middle Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="KinPhone"
                            placeholder="080-000-0000"
                            disabled={!editable}
                        />


                        {editable && <SubmitButton title="Submit Update" disable={buttonDisable} />}
                        {editable && <span onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span onClick={e => toggleEdit(true)}>Edit Info</span>}

                    </Form>


        </>
    )
}


export default NextOfKin