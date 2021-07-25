import React, { useState } from 'react'

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFormikContext } from "formik";

//custom components
import FieldError from "../Error/FieldError"


const FormCheckBox = ({ name, text, disabled=false }) => {

    const {
        errors,
        touched
      } = useFormikContext();

      let { values } = useFormikContext()

    const[checked, setChecked] = useState(values[name])


    const toggleCheckBox = () => {
        values[name] = !values[name]
        setChecked(!checked)
    }

    const doNothing = () => {}

    return(
        <>

            <div className="formInput">
                <div className={`picker${disabled ? ' no-touch' : ''}`} onClick={e => disabled ? doNothing() : toggleCheckBox()}>
                    {
                        checked ? <FontAwesomeIcon icon="check-circle" className="picked" /> : <FontAwesomeIcon icon={['far', 'check-circle']} className={`not-picked ${touched[name] ? 'pls-pick' : ''}`} />
                    }
                    
                </div>
                <div className="picker-title">{text}</div>
                <FieldError error={errors[name]} visible={touched[name]} />
            </div>

        </>
    )
}




export default FormCheckBox