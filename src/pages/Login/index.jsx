import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'


import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { loginUser } from '../../store/reducers/user'
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import PageWrapper from '../../components/PageWrapper'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(6).label("Password")
})


const Login = () => {

    const dispatch = useDispatch()

    const { buttonDisable, isAuthenticated, isLoading } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable,
        isAuthenticated : state.user.isAuthenticated,
        isLoading : state.isLoading
    }), shallowEqual)


    const submitForm = ({ email, password }) => {

            const userData = {
                email,
                password
            }

            dispatch(disableButton())
            dispatch(loginUser(userData))


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
                        initialValues={{ email: "", password: "" }}
                        onSubmit={submitForm}
                        validationSchema={validationSchema}
                    >

                        <Row>

                            <Col md={12}>

                                <FormField 
                                    type="email"
                                    name="email"
                                    placeholder="youremail@mail.com"
                                    label="Email"
                                    icon="at"
                                />

                                <FormField 
                                    type="password"
                                    name="password"
                                    placeholder="******"
                                    label="Password"
                                    icon="unlock-alt"
                                />

                            </Col>


                            <Col md={12}>

                                <div className="spacer"></div>

                                <SubmitButton title="Login" disable={buttonDisable} />

                                <span className="formNote text-center">
                                    Don't have an account ? <Link to="/register">Register Here</Link>
                                </span>

                                <span className="formNote text-center">
                                    <Link to="/forgot-password">Forgot Password</Link>
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


export default Login