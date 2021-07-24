import React from "react";

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//custom components
import FieldError from "../Error/FieldError"



const AppFormField = ({ name, type, placeholder = "", icon = false, disabled = false, hidden = false }) =>{
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>

     <div className={`formInput ${errors[name] && touched[name] ? 'error' : ''}`}>
      {
          icon && <FontAwesomeIcon icon={icon} />
      }
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
       <FieldError error={errors[name]} visible={touched[name]} />
     </div>
      
      

    
    </>
  );
}




export default AppFormField;
