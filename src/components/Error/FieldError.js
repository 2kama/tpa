import React from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FieldError = ({ error, visible }) => {

    if (!visible || !error) return null;

    return (
        <>
            <span className="fieldError"><FontAwesomeIcon icon="exclamation-circle" /> {error}</span>   
        </>
    )

}



export default FieldError
