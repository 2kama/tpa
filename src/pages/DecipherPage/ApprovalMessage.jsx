import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AccountApproval from '../../components/Lottie/AccountApproval'



const ApprovalMessage = () => {


    return(
        <>

            <Container fluid className="wall pt-5">
                <Row className="pt-5 mt-5">

                    <Col md={{span:4, offset:4}} className="pt-5">
                        <AccountApproval />
                        <Row>
                        <Col md={12} className="text-center">
                            <h4>Your Account will be approved by an Admin shortly</h4>
                            <div className="spacer"></div>
                            <a href="/logout" className="button btn-danger">Logout</a>
                        </Col>

                        </Row>
                        

                    </Col>

                </Row>
            </Container>
            
        </>
    )
}


export default ApprovalMessage