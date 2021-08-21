import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { forgotPassword } from '../../store/reducers/user'
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'


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
        <PageWrapper 
            inside={false} 
            isAuthenticated={isAuthenticated} 
            isLoading={isLoading}
        >

                    <Container fluid className="wall">

                    <Col md={{ span:4, offset:4 }}>
                        
                        <Card className="position-absolute top-50 start-50 translate-middle p-5 auth">

                            <Form
                                initialValues={{ email: "" }}
                                onSubmit={submitForm}
                                validationSchema={validationSchema}
                            >

                                <Row>

                                    <Col md={12}>

                                    <FormField 
                                        type="email"
                                        name="email"
                                        placeholder="youremail@mail.com"
                                        icon="at"
                                        label="Email"
                                    />

                                    </Col>


                                    <Col md={12}>

                                        <div className="spacer"></div>

                                        <SubmitButton title="Send Reset Email" disable={buttonDisable} />

                                        <span className="formNote text-center">
                                            Back to <Link to="/login">Login</Link>
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


export default ForgotPassword