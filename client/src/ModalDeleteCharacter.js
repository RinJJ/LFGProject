import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './index.css'

function ModalDeleteCharacter( { character_id, deleteCharacter, currentCharacter_name } ) {

    // setting state to show and hide modal. as well as handling the deletion of the obj from the database

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };



    const handleDelete = () => {


        fetch(`/characters/${character_id}`,{
        method: 'DELETE'
        }).then(r => {
            if(r.ok){
                deleteCharacter(character_id)
            }
        })
    }

    const handleShow = () => setShow(true);

    return(
        <>
            <Button className="modalButton" variant="outline-danger" onClick={handleShow}>
                <span role="img" aria-labelledby="waste-basket">🗑️</span>
            </Button>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete "{currentCharacter_name}"?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                    <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteCharacter;
