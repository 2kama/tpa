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
                            name="kinFirstName"
                            placeholder="First Name"
                            disabled={!editable}
                            label="First Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            name="kinLastName"
                            placeholder="Last Name"
                            disabled={!editable}
                            label="Last Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            name="kinMiddleName"
                            placeholder="Middle Name"
                            disabled={!editable}
                            label="Middle Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            name="KinPhone"
                            placeholder="080-000-0000"
                            disabled={!editable}
                            label="Tel No"
                            icon="phone"
                        />

                        <div className="spacer"></div>
                        {editable && <SubmitButton title="Submit Update" disable={buttonDisable} />}
                        <div className="spacer"></div>
                        {editable && <span className="pointer text-danger" onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span className="pointer text-success" onClick={e => toggleEdit(true)}>Edit Info</span>}

                    </Form>


        </>
    )
}


export default NextOfKin