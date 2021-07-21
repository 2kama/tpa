import React, { useState } from "react";

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from "react-bootstrap";

//custom components
import FieldError from "../Error/FieldError"


const FormSelect = ({ icon=false, options, value, select, disabled=false, error }) =>{
  


  const [show, toggleShow] = useState(false)
  const [currentVal, setVal] = useState(value)

  const doNothing = () => {}


  const choose = (idx) => {
      setVal(idx)
      toggleShow(false)
      select(idx)
  }

  return (
    <>
        <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
            <Modal.Body>
                <div className="card">

                    {
                        options.map((tag, idx) => <div onClick={e => choose(idx)} key={tag[1]} className={`${value === idx && 'selected'} optionsTag`}>{tag[0]}</div>)
                    }
                </div>
             </Modal.Body>
        </Modal>

        <div className={`formInput${error ? ' error' : ''}`} onClick={e => disabled ? doNothing() : toggleShow(true)}>
            {
                icon && <FontAwesomeIcon icon={icon} />
            }
        
            <input
            value={options[currentVal][0]}
            type="text"   
            disabled={true} 
            />

            <FieldError error="This field is required" visible={error} />
        
        </div>
    
    </>
  );
}



export default FormSelect;
