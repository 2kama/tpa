import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLog } from '../../store/reducers/user'

import Authenticate from '../../components/Authenticate'
import PageNotFound from '../PageNotFound'
import { Table } from '../../components/Table/Table'
import { exactTime, TIME_ZONE } from '../../utils/helperFunctions'


const LogPage = () => {


    const { uid, isLoading, isApproved, log } = useSelector(state => ({
        isLoading : state.isLoading,
        isApproved : state.user.isApproved,
        uid : state.user.uid,
        log : state.user.log
    }))

    const dispatch = useDispatch()


    useEffect(() => {

        if(!isLoading) {
            dispatch(getLog(uid))
        }

    }, [dispatch, uid, isLoading])


    return(
        <>
            <Authenticate inside={true} />

            {
                !isLoading && log && (
                
                isApproved ? (
                    <>

                        <div>log page</div>

                        <Table 
                            headers={["time", "info"]}
                            data={log.reverse().map(lg => (
                                {
                                    ...lg,
                                    "time" : exactTime(lg.time - TIME_ZONE)
                                }
                                ))}
                        />

                    </>
                ) : <PageNotFound />)


            }
        </>
    )
}



export default LogPage