import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import PageWrapper from '../../../components/PageWrapper'


const UserDashboard = () => {

    const { role, isLoading, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        isApproved : state.user.isApproved
    }))

    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="isUser" 
            onPage="01"
            isLoading={isLoading}
            isApproved={isApproved}
        >

            <Container fluid className="wall">
                This is the User Dashboard Page
            </Container>
                        
                        
        </PageWrapper>
    )
}


export default UserDashboard