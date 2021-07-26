import React from "react";

//third party components
import { useFormikContext } from "formik";


const SubmitButton = ({ title, disable=false }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <>
      <div className="submitButtonWrap">
        {disable ? 
            (<button className="submitButton" type="submit" disabled>{title}</button>)
            : 
            (<button className="submitButton" type="submit" onClick={handleSubmit}>{title}</button>)
        }
       </div>
    </>
    
  
  )
}




export default SubmitButton;
