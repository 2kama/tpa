import React, { useState } from 'react'
import firebase from '../../utils/Firebase'
import { v4 as uuidv4 } from 'uuid'

//third party components
import { useFormikContext } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


//custom components
import FieldError from "../Error/FieldError"

const storage = firebase.storage().ref()


const FormUpload = ({ name, icon = false, disabled = false, hidden = false, sizeLimit, fileDestination, fileType }) => {

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

 

    const onChange = () => {

        let file = document.querySelector(`#uploadFile`).files[0]

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



    return(
        <>

                <div className={`formInput${errors[name] && (touched[name] || showError) ? 'error' : ''}`}>
                {
                    icon && <FontAwesomeIcon icon={icon} />
                }
                <input
                    onChange={onChange}
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
                    <div>{progress}%</div>
                <FieldError error={errors[name]} visible={touched[name] || showError} />
                </div>
            
        </>
    )
}


export default FormUpload