import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormCheckBox, FormField, SubmitButton } from '../../components/Form'
import { registerUser } from '../../store/reducers/user'
import { useQuery } from '../../utils/query';
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'


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

    const termsText = <span>I agree to the <a href="/">terms and Conditions</a></span>

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
        <PageWrapper 
            inside={false} 
            isAuthenticated={isAuthenticated} 
            isLoading={isLoading}
        >

                    <Container fluid className="wall">

                    <Col md={{ span:8, offset:2 }}>
                        
                        <Card className="position-absolute top-50 start-50 translate-middle p-5 auth-2">



                        <Form
                            initialValues={{ firstName: "", lastName: "", phone: "", email: "", password: "", passwordConfirmation: "", referralCode: query.referralCode || "", terms : false }}
                            onSubmit={submitForm}
                            validationSchema={validationSchema}
                        >

                            <Row>

                                <Col md={6}>

                                    <FormField 
                                        name="firstName"
                                        label="First Name"
                                        placeholder="John"
                                        icon={['far', 'user']}
                                    />

                                    <FormField 
                                        name="lastName"
                                        label="Last Name"
                                        placeholder="Doe"
                                        icon={['far', 'user']}
                                    />

                                    <FormField 
                                        type="email"
                                        name="email"
                                        placeholder="youremail@mail.com"
                                        label="Email"
                                        icon="at"
                                    />

                                    <FormField 
                                        name="phone"
                                        placeholder="080-000-0000"
                                        label="Tel. Number"
                                        icon="phone"
                                    />

                                </Col>


                                <Col md={6}>

                                    <FormField 
                                        type="password"
                                        name="password"
                                        placeholder="******"
                                        label="Password"
                                        icon="unlock-alt"
                                    />

                                    <FormField 
                                        type="password"
                                        name="passwordConfirmation"
                                        placeholder="******"
                                        label="Confirm Password"
                                        icon="unlock-alt"
                                    />

                                    <FormField 
                                        name="referralCode"
                                        placeholder="#####"
                                        label="Referral code [Optional]"
                                        icon="hashtag"
                                    />

                                    <FormCheckBox name="terms" text={termsText} />

                                </Col>


                                <Col md={{ span : 6, offset : 3}}>

                                    <div className="spacer"></div>

                                    <SubmitButton title="Register" disable={buttonDisable} />

                                    <span className="formNote text-center">
                                        Already have an account ? <Link to="/login">Login</Link>
                                    </span>

                                </Col>


                            </Row>

                            
                        </Form>

                        </Card>

                        
                    </Col>
                    </Container>
        </PageWrapper>
    )
}


export default Register