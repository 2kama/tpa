import React, { useState } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormikContext } from "formik";

//custom components
import FieldError from "../Error/FieldError"


const FormCheckBox = ({ name, text, disabled=false }) => {

    const {
        errors
      } = useFormikContext();

      let { values, touched } = useFormikContext()

    const[checked, setChecked] = useState(values[name])


    const toggleCheckBox = () => {
        values[name] = !values[name]
        setChecked(!checked)

        if(values[name]) {
            touched[name] = false
        }
    }

    const doNothing = () => {}

    const isError = errors[name] && touched[name]

    return(
        <>

            <div className={`formInput d-flex flex-row${isError ? ' error' : ''}`}>
                <div className={`iconArea${disabled ? ' no-' : ' clickable'}`} onClick={e => disabled ? doNothing() : toggleCheckBox()}>
                    {
                        checked ? <FontAwesomeIcon icon="check-square" className="picked" /> : <FontAwesomeIcon icon={['far', 'square']} className="not-picked" />
                    }
                    
                </div>
                <div className="inputArea d-flex flex-column">
                    <label>{isError ? errors[name] : <div className="pb-2"></div>}</label>
                    <div className="picker-title">{text}</div>
                </div>
            </div>

        </>
    )
}




export default FormCheckBox