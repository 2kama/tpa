import React from 'react'
import { Modal, Button } from 'react-bootstrap';

const BaseModal = ({show, close, title, children, closeText}) => {
    return (
        <Modal
            show={show}
            onHide={close}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    {closeText}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BaseModal
