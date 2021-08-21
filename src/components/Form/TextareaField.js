import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TextareaField = ({ name, placeholder="", rows=5, maxlength=500, icon=false, disabled=false, hidden=false, label="" }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();


  const isError = errors[name] && touched[name]

  return (
    <div className={`formInput d-flex flex-row${disabled ? ' disabled' : ''}${isError ? ' error' : ''}`}>
        {
            icon && <div className="iconArea"><FontAwesomeIcon icon={icon} /></div>
        }
      <div className="inputArea d-flex flex-column">
          <label>{isError ? errors[name] : label}</label>
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

      
      </div>
    
    </div>
  );
}


export default TextareaField;
