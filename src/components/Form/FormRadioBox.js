import React, { Fragment } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const FormRadioBox = ({ checked, choice, text, clicker, error, disabled=false }) => {


    const doNothing = () => {}


    return(
        <Fragment>

            <div className="formInput">
                <div className={`picker${disabled ? ' no-touch' : ''}`} onClick={e => disabled ? doNothing() : clicker(!checked)}>
                    {
                        checked === choice ? <FontAwesomeIcon icon="circle" className="picked" />: <FontAwesomeIcon icon={["far", "circle"]} className={`not-picked${error && checked === "" ? ' pls-pick' : ''}`} />
                    }
                    
                </div>
                <div className="picker-title">{text}</div>
            </div>

        </Fragment>
    )
}





export default FormRadioBox