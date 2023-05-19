import React, {useState, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { CurrentUserContext } from "./context/CurrentUser"

import './index.css'

function ModalDeleteGroup( { id, deleteOwnedGroup, group_name} ) {

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
        <Button className="modalButton" variant="outline-danger" onClick={handleShow}>
            <span role="img" aria-labelledby="waste-basket">🗑️</span>
        </Button>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-align center'>Are you sure you want to delete the group "{group_name}"?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>Close</Button>
                <Button variant="outline-danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default ModalDeleteGroup;
