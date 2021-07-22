import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Authenticate from '../../components/Authenticate'
import PageNotFound from '../PageNotFound'
import { getUnapprovedUsers } from "../../store/reducers/unapprovedUser";
import { Table } from '../../components/Table/Table';

const UnapprovedAccounts = () => {
    const dispatch = useDispatch()
    const { role, isLoading, unapprovedUsers } = useSelector(state => ({
        role : state.user.role,
        isLoading : state.isLoading,
        unapprovedUsers: state.unapprovedUsers
    }))

    useEffect(() => {
        dispatch(getUnapprovedUsers())
        // eslint-disable-next-line
    },[unapprovedUsers])

    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && role && (
                
                role.isAdmin ? (
                    <>

                        Unapproved Users
                        <hr />
                        <Table
                            headers={['firstName', 'lastName', 'email', 'phone', 'actions']}
                            data={unapprovedUsers} 
                        />
                    </>
                    
                ) : <PageNotFound />)


            }
            
            
        </>
    )
}

export default UnapprovedAccounts
