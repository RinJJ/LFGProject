import React, {useState, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { CurrentUserContext } from "./context/CurrentUser"

import './index.css'

function ModalDeleteGroup( { id, deleteOwnedGroup} ) {

    const { currentUser } = useContext(CurrentUserContext)

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false)
    };

    const handleDelete = () => {


        fetch(`/groups/${id}`,{
        method: 'DELETE'
        }).then(r => {
            if(r.ok){
                deleteOwnedGroup(id)
            }
        })
    }



    return (
        <>
        <Button className="modalButton" variant="primary" onClick={handleShow}>
            <span role="img" aria-labelledby="waste-basket">🗑️</span>
        </Button>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default ModalDeleteGroup;
