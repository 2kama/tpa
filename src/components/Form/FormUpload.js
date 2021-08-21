import React, { useState } from 'react'
import firebase from '../../utils/Firebase'
import { v4 as uuidv4 } from 'uuid'

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar } from 'react-bootstrap'


//custom components

const storage = firebase.storage().ref()


const FormUpload = ({ name, icon = false, disabled = false, hidden = false, sizeLimit, fileDestination, fileType, label="" }) => {

      let { values, errors } = useFormikContext()
      const { touched } = useFormikContext()
   
    const [progress, setProgress] = useState(0)
    const [showError, setShowError] = useState(false)

    const getUploadError = (isError, err) => {

        values[name] = ""

        if (isError) {
            setShowError(true)
            errors[name] = err
        }else {
            setShowError(false)
            errors[name] = false
        }
    }

 

    const onChange = (e) => {

        let file = e.target.files[0]
        setProgress(0)
        getUploadError(false, "no-error")

        if(file !== undefined) {

            if(fileType.indexOf(file.type) !== -1) {

                if(file.size <= sizeLimit) {
    
                     let metadata = {
                         contentType : file.type
                     }
    
                    
                     let uploadTask = storage.child(`${fileDestination}/${uuidv4()}.${file.type.split("/")[1]}`).put(file, metadata)
    
                     uploadTask.on('state_changed', snapshot => {
    
                        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    
                     }, err => {
                        getUploadError(true, err.message)
                     }, () => {
    
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
    
                            values[name] = downloadURL
                        })
    
                     })
    
    
                }else {
                    getUploadError(true, `Image should be no larger than ${sizeLimit / 1024}kb`)
                }
    
            }else {
                getUploadError(true, "Image must be a png or jpeg/jpg image")
            }

        }

        
    }

    const isError = (errors[name] && touched[name]) || showError

    return(
        <>

        <div className={`formInput d-flex flex-row${disabled ? ' disabled' : ''}${isError ? ' error' : ''}`}>
                {
                    icon && <div className="iconArea"><FontAwesomeIcon icon={icon} /></div>
                }

                <div className="inputArea d-flex flex-column">
                    <label>{isError ? errors[name] : label}</label>
                    <input
                        onChange={e => onChange(e)}
                        type="file"
                        disabled={disabled}
                        hidden={hidden}
                        id="uploadFile"
                    />
                    <input
                        hidden
                        disabled
                        name={name}
                        value={values[name]}
                    />
                        
              </div>
        </div>
        { progress > 0 && <ProgressBar striped variant="success" now={progress} className="formProgress" /> }
            
        </>
    )
}


export default FormUpload