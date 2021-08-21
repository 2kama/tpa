import React, {useEffect} from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Container, Col, Row } from 'react-bootstrap'
import PageWrapper from '../../../components/PageWrapper';
import { 
    getTraders, getUsers, getAdmins,
    getAffiliates, setAlterUsers 
} from "../../../store/reducers/adminQuery";
import AlterUsers from '../../../components/Admin/AlterUsers';

const ApprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, alterUsers, traders, isApproved } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.user.isLoading,
        alterUsers: state.adminQuery.alterUsers,
        traders: state.adminQuery.traders,
        isApproved : state.user.isApproved
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getTraders())
        // eslint-disable-next-line
    }, [])

    const update = (dispatchFunc) => {
        dispatch(dispatchFunc())
    }

    return(
        <PageWrapper 
        inside={true} 
        role={role} 
        account="isAdmin" 
        onPage="13"
        isLoading={isLoading}
        isApproved={isApproved}
    >
            <Container fluid className="wall">
                    <div className="spacer"></div>
                    <Row>
                        <Col md={3}>
                        <button className="btn btn-secondary mb-3" onClick={() => {update(getUsers)}}>View User Accounts</button>
                        </Col>
                        <Col md={3}>
                        <button className="btn btn-secondary mb-3" onClick={() => {update(getAffiliates)}}>View Affiliate Accounts</button> 
                        </Col>
                        <Col md={3}>
                        <button className="btn btn-secondary mb-3" onClick={() => {dispatch(setAlterUsers(traders))}}>View Traders Accounts</button> 
                        </Col>
                        <Col md={3}>
                        <button className="btn btn-secondary mb-3" onClick={() => {update(getAdmins);}}>View Admin Accounts</button> 
                        </Col>
                        
                        
                    </Row>

                        {traders && alterUsers ? alterUsers.length > 0 ? <AlterUsers 
                            traders={traders} 
                            users={alterUsers} 
                            approve={false} /> : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">No Approved Accounts for this category</Col>
                            : <Col md={{span:4,offset:4}} className="btn-secondary rounded p-2 text-center">Loading Accounts...</Col>
                        }
   
        </Container>
                        
    </PageWrapper>
    )
}

export default ApprovedAccounts

