import React, { useState, useContext} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { CurrentUserContext } from "./context/CurrentUser"
import './index.css'
import {v4} from 'uuid'

function ModalJoinGroup( {id, group_name, charactersByUserArray, setGroupsArray } ) {

    const { currentUser } = useContext(CurrentUserContext)

    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [character_id, setCharacter_id] = useState()

    const handleCharacter = (e) => {
        setCharacter_id(e.target.value)
    }

    const handleJoin = (e) => {
        e.preventDefault()
        const newCharacterGroup = {
            character_id: character_id,
            group_id: id,
        };
    
        fetch(`/groupswithoutuser/${currentUser.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCharacterGroup),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then(newGroupo => {
                        setGroupsArray(newGroupo) 
                    })
                    handleClose()
                }
            })
        };




    return (
        <>
        <Button className="modalButton" variant="outline-primary" onClick={handleShow}>Join Group</Button>
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Join Group "{group_name}"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group>
                <Form.Control 
                as="select"
                onChange={handleCharacter}
                name="character_select"
                style={{margin: '0 auto', width: '200px'}}
                >
                    <option value="">---Select A Character---</option>
                    {charactersByUserArray.map(cObj => {
                        return (
                            <option value={cObj.id} key={v4()}> {cObj.character_name} </option>
                        )
                    })
                    }
                </Form.Control>
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={handleJoin}>Join</Button>
                <Button variant="outline-secondary" onClick={handleClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        </>
    );

}

export default ModalJoinGroup;
