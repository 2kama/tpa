import React from 'react'
import { useSelector } from 'react-redux'
import { shallowEqual } from 'react-redux';
import PageWrapper from '../../../components/PageWrapper';
import { Container } from 'react-bootstrap';

const AdminDashboard = () => {
    const { role, isLoading, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        isApproved : state.user.isApproved
    }), shallowEqual)
        
    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="isAdmin" 
            onPage="01"
            isLoading={isLoading}
            isApproved={isApproved}
        >


            <Container fluid className="wall">

                    This is the Admin Dashboard Page

            </Container>

                        
           </PageWrapper>
    )
}


export default AdminDashboard