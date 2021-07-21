import React, { Fragment } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const FormToggle = ({ text, currentState, control, btnStyle, disabled=false }) => {

    const doNothing = () => {}


    return(
        <Fragment>

            <span className="gt-toggle mb-4 float-left">
                <span className="float-left">{text}</span>
                <FontAwesomeIcon onClick={e => disabled ? doNothing() : control(!currentState)} style={btnStyle} className={`float-right ${currentState ? "on" : "off"}`} icon={currentState ? "toggle-on" : "toggle-off"} />
            </span>

        </Fragment>
    )
}


export default FormToggle