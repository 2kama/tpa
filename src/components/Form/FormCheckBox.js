import React from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const FormCheckBox = ({ checked, text, clicker, error, disabled=false }) => {

    const doNothing = () => {}

    return(
        <>

            <div className="formInput">
                <div className={`picker${disabled ? ' no-touch' : ''}`} onClick={e => disabled ? doNothing() : clicker(!checked)}>
                    {
                        checked ? <FontAwesomeIcon icon="check-circle" className="picked" /> : <FontAwesomeIcon icon={['far', 'check-circle']} className={`not-picked ${error ? 'pls-pick' : ''}`} />
                    }
                    
                </div>
                <div className="picker-title">{text}</div>
            </div>

        </>
    )
}




export default FormCheckBox