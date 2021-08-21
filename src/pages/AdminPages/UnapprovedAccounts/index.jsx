import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { getUnapprovedUsers, getTraders } from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';
import PageWrapper from '../../../components/PageWrapper';
import { Container, Col } from 'react-bootstrap';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, traders, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
        isApproved : state.user.isApproved
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    },[])

    return(
        <PageWrapper 
            inside={true} 
            role={role} 
            account="isAdmin" 
            onPage="12"
            isLoading={isLoading}
            isApproved={isApproved}
        >
                <Container fluid className="wall">

                    {traders && alterUsers ? alterUsers.length > 0 ? 
                    <AlterUsers 
                            users={alterUsers} 
                            approve={true} 
                            traders={traders} /> : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">No Unapproved Accounts</Col>
                            : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">Loading Accounts...</Col>
                    }

                </Container>
                        
        </PageWrapper>
    )
}

export default UnapprovedAccounts

