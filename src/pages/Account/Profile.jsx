import React, { useState } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { updateUser } from '../../store/reducers/user'



const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3).label("First Name"),
    lastName: Yup.string().required().min(3).label("Last Name"),
    phone: Yup.string().required().label("Phone Number")
})


const Profile = ({ user }) => {

    const[editable, toggleEdit] = useState(false)

    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)

    const dispatch = useDispatch()


    const submitForm = ({ firstName, lastName, middleName, phone }) => {

        const userData = {
            firstName,
            lastName,
            middleName,
            phone
        }

        dispatch(disableButton())
        dispatch(updateUser(userData))

    }



    const {firstName, lastName, middleName, email, phone} = user

    return(
        <>
            <h4>Profile</h4>


                <Form
                        initialValues={{ 
                            firstName, 
                            lastName, 
                            middleName, 
                            phone, 
                            email, 
                            affiliateCode: user.role.isAffiliate ? user.affiliateCode : null 
                        }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <FormField 
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            disabled={!editable}
                        />

                        <FormField 
                            type="email"
                            name="email"
                            placeholder="youremail@mail.com"
                            disabled={true}
                        />

                        <FormField 
                            type="text"
                            name="phone"
                            placeholder="080-000-0000"
                            disabled={!editable}
                        />

                        {user.role.isAffiliate && 
                            <FormField 
                                type="text"
                                name="affiliateCode"
                                placeholder="Affiliate Code"
                                disabled={true}
                            />
                        }


                        {editable && <SubmitButton title="Submit Update" disable={buttonDisable} />}
                        {editable && <span onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span onClick={e => toggleEdit(true)}>Edit Profile</span>}

                    </Form>


        </>
    )
}


export default Profile