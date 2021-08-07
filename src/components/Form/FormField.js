import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const AppFormField = ({ name, type="text", label="", placeholder = "", icon = false, disabled = false, hidden = false }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  const isError = errors[name] && touched[name]

  return (
    <>

     <div className={`formInput d-flex flex-row${isError ? ' error' : ''}`}>
        {
            icon && <div className="iconArea"><FontAwesomeIcon icon={icon} /></div>
        }
        <div className="inputArea d-flex flex-column">
          <label>{isError ? errors[name] : label}</label>
          <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values[name]}
              name={name}
              type={type}    
              placeholder={placeholder}
              disabled={disabled}
              hidden={hidden}
            />

        </div>
        
     </div>
      
      

    
    </>
  );
}




export default AppFormField;
