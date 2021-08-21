import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const BaseModal = ({show, close, title, children, closeText, size}) => {
    return (
        <Modal
            show={show}
            onHide={close}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title className="text-center">
                    {title}
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={close}>
                    {closeText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BaseModal
