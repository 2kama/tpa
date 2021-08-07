import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//custom components
import FieldError from "../Error/FieldError"

const TextareaField = ({ name, placeholder="", rows=5, maxlength=500, icon=false, disabled=false, hidden=false }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <div className={`formInput ${errors[name] && touched[name] ? 'error' : ''}`}>
        {
            icon && <FontAwesomeIcon icon={icon} />
        }
      
      <textarea
        onBlur={handleBlur}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxlength}
        value={values[name]}
        disabled={disabled}
        hidden={hidden}
      ></textarea>
      <FieldError error={errors[name]} visible={touched[name]} />

    
    </div>
  );
}


export default TextareaField;
