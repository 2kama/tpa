import React from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import * as Yup from 'yup'

import Authenticate from '../../components/Authenticate'
import { disableButton } from '../../store/reducers/buttonState'
import { Form, FormField, SubmitButton } from '../../components/Form'
import { loginUser } from '../../store/reducers/user'
import { Col, Container, Row } from 'react-bootstrap'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

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
        <>
            <Authenticate inside={false} />



            <Container fluid className="wall">


            {
                !isLoading && !isAuthenticated && (

                    <Col md={{ span:4, offset:4 }} className="auth">
                        
                        <Card className="p-5 mx-auto align-middle">



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

                                </Col>


                            </Row>


                        </Form>

                        </Card>

                        
                    </Col>
                )
            }



            </Container>

            <Footer />
        </>
    )
}


export default Login