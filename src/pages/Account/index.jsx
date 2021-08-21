import React, {  } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import BankDetails from './BankDetails'
import ChangePassword from './ChangePassword'
import NextOfKin from './NextOfKin'
import Profile from './Profile'
import PageWrapper from '../../components/PageWrapper'
import { Tabs, Tab, Col, Row, Container } from 'react-bootstrap'
import Card from '../../components/Card'



const Account = () => {

    const { role, isLoading, isApproved, user } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        isApproved : state.user.isApproved,
        user : state.user
    }), shallowEqual)



    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="general" 
            onPage="02"
            isLoading={isLoading}
            isApproved={isApproved}
        >

        <Container fluid className="wall">

            <Row>

            
            
                <Card className=" p-5 tabCard">

                <Col md={6}>
                    
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Profile">
                        <Profile user={user} />
                    </Tab>

                    <Tab eventKey="kin" title="Next of Kin" disabled={role && role.isUser ? false : true}>
                        <NextOfKin user={user} />
                    </Tab>
                    <Tab eventKey="bank" title="Bank Details" disabled={role && role.isUser ? false : true}>
                         <BankDetails user={user} />
                     </Tab>
                              
                    <Tab eventKey="password" title="Change Password">
                        <ChangePassword />
                    </Tab>
                </Tabs>
                </Col>


                </Card>
            
            </Row>

        

        </Container>


                        

                        

                        

        </PageWrapper>
    )
}


export default Account