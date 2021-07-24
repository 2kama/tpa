import React, { useState } from "react";

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from "react-bootstrap";
import { useFormikContext } from "formik";

//custom components
import FieldError from "../Error/FieldError"

const FormSelect = ({ name, icon=false, options, updateStuff, index, disabled=false }) =>{


    const {
        errors,
        touched
      } = useFormikContext();

      let { values } = useFormikContext()


  const [show, toggleShow] = useState(false)
  const [currentIndex, setIndex] = useState(index)

  const doNothing = () => {}


  const choose = (idx) => {
      setIndex(idx)
      toggleShow(false)
      values[name] = options[idx][1]
      updateStuff && updateStuff(options[idx][1])
  }

  return (
    <>
        <Modal centered show={show} onHide={e => toggleShow(!show)} size="md">
            <Modal.Body>
                <div className="card">

                    {
                        options.map((tag, idx) => <div onClick={e => choose(idx)} key={tag[1]} className={`optionsTag`}>{tag[0]}</div>)
                    }
                </div>
             </Modal.Body>
        </Modal>

        <div className={`formInput`} onClick={e => disabled ? doNothing() : toggleShow(true)}>
            {
                icon && <FontAwesomeIcon icon={icon} />
            }
        
            <input
            value={options[currentIndex][0]}
            type="text"   
            disabled={true} 
            />

            <FieldError error={errors[name]} visible={touched[name]} />
        
        </div>

    
    </>
  );
}

export default FormSelect;
