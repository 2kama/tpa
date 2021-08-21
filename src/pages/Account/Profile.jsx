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
                            name="firstName"
                            placeholder="First Name"
                            disabled={!editable}
                            label="First Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            name="lastName"
                            placeholder="Last Name"
                            disabled={!editable}
                            label="Last Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            name="middleName"
                            placeholder="Middle Name"
                            disabled={!editable}
                            label="Middle Name"
                            icon={["far", "user"]}
                        />

                        <FormField 
                            type="email"
                            name="email"
                            placeholder="youremail@mail.com"
                            disabled={true}
                            label="Email"
                            icon="at"
                        />

                        <FormField 
                            name="phone"
                            placeholder="080-000-0000"
                            disabled={!editable}
                            label="Tel No"
                            icon="phone"
                        />

                        {user.role.isAffiliate && 
                            <FormField 
                                name="affiliateCode"
                                placeholder="Affiliate Code"
                                disabled={true}
                                label="Affiliate Code"
                                icon="hashtag"
                            />
                        }
                        <div className="spacer"></div>

                        {editable && <SubmitButton title="Submit Update" disable={buttonDisable} />}
                        <div className="spacer"></div>
                        {editable && <span className="pointer text-danger" onClick={e => toggleEdit(false)}>Cancel</span>}
                        {!editable && <span className="pointer text-success" onClick={e => toggleEdit(true)}>Edit Profile</span>}

                    </Form>


        </>
    )
}


export default Profile