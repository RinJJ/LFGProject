import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'


function ModalFormEditCharacter( { key } ) {
// how do i bring down the previous inputs of character name,race,class
    //I should be able to edit the character by directly editing ty the id in /charactersbyid


    //TODO: I STILL NEED CHARACTER INFO PASSED INTO HERE FROM PREVIOUS COMPONENT



// Modal Setup for show and hide
    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  //TODO: should this be in the character page?

// Setting state for modal form
    const [character_name, setCharacter_Name] = useState('')
    const [character_race, setCharacter_Race] = useState('')
    const [character_class, setCharacter_Class] = useState('')

// Handle changes to form
    const handleCharacter_Name = (e) => { setCharacter_Name(e.target.value) }
    const handleCharacter_Race = (e) => { setCharacter_Race(e.target.value) }
    const handleCharacter_Class = (e) => { setCharacter_Class(e.target.value) }


// Handle Submit and Patch request? I should also change state of show at the end of fetch.

    const handleSubmit = (e) => {
        e.preventDefault();

        const patchCharacter = {
            character_name: character_name,
            character_race: character_race,
            character_class: character_class,
        }

        fetch(`/character/${key}` , {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ patchCharacter })
        })
        .then(r => {
            if(r.ok){
                handleClose()
            }
        })
    }
        // Changing the backend is good and all but dont I need state somehwhere in fetch to change the dom? do I pass character state from PageMyCharacters
    return (
        <>
            <Button className="modalButton" variant="primary" onClick={handleShow}>View Details</Button>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Character</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <div>
                        <Form.Control onChange={handleCharacter_Name} type='text' name = 'character_name' placeholder={`${character_name}`} />
                        <Form.Control onChange={handleCharacter_Race} type='text' name = 'character_race' placeholder={`${character_race}`} />
                        <Form.Control onChange={handleCharacter_Class} type='text' name = 'character_class' placeholder={`${character_class}`} />
                    </div>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSubmit}>Save</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalFormEditCharacter;
