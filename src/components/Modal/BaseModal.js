import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const BaseModal = ({show, close, title, children, doneText, closeText, onDone, disabled}) => {
    return (
        <Modal
            show={show}
            onHide={close}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    {closeText}
                </Button>
                <Button variant="primary" onClick={onDone}>
                    {doneText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BaseModal
