import React, { useState } from "react";

//third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from "react-bootstrap";
import { useFormikContext } from "formik";


const FormSelect = ({ name, icon=false, options, index, disabled=false, update, hidden = false, label="" }) =>{


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
      update && update(options[idx][1])
  }

  const isError = errors[name] && touched[name]

  return (
    <>
        <Modal centered show={show} onHide={e => toggleShow(!show)} size="md" className="optionsModal">
            <Modal.Body>
                <div>

                    {
                        options.map((tag, idx) => <div onClick={e => choose(idx)} key={tag[1]} className={`optionsTag pointer`}>{tag[0]}</div>)
                    }
                </div>
             </Modal.Body>
        </Modal>

        <div className={`formInput pointer d-flex flex-row${disabled ? ' disabled' : ''}${isError ? ' error' : ''}`} onClick={e => disabled ? doNothing() : toggleShow(true)}>
        {
            icon && <div className="iconArea"><FontAwesomeIcon icon={icon} /></div>
        }

         <div className="inputArea d-flex flex-column pointer">
                <label>{isError ? errors[name] : label}</label>
                
                    <input
                    value={options[currentIndex][0]}
                    type="text"   
                    disabled={true} 
                    className="pointer"
                    />

            </div>

        
        </div>

    
    </>
  );
}



export default FormSelect;