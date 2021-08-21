import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { verifyUser } from '../../store/reducers/user'

import { Col, Container, Row } from 'react-bootstrap'
import { disableButton } from '../../store/reducers/buttonState'
import EmailVerify from '../../components/Lottie/EmailVerify'


const VerifyEmail = () => {


    const dispatch = useDispatch()

    const { buttonDisable } = useSelector(state => ({
        buttonDisable : state.buttonState.buttonDisable
    }), shallowEqual)


    const verifyEmail = () => {
        dispatch(disableButton())
        dispatch(verifyUser())

    }

    return(
        <>

            <Container fluid className="wall pt-5">
                <Row className="pt-5 mt-5">

                    <Col md={{span:4, offset:4}} className="pt-5">
                        <EmailVerify />
                        <Row>
                        <Col md={12} className="text-center">
                            <h4>Your accounts have been approved. </h4>

                            <div className="spacer"></div>
                            <button  disabled={buttonDisable} onClick={e => verifyEmail()} className="submitButton">Click to send Email Verification</button>

                            <span className="formNote">
                                <a href="/logout">Logout</a>
                            </span>
                        </Col>

                        </Row>
                        

                    </Col>

                </Row>
            </Container>
        </>
    )
}


export default VerifyEmail