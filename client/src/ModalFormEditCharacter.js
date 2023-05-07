import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../index.css'


function ModalFormEditCharacter() {

    //I should be able to edit the character by directly editing ty the id in /charactersbyid

// Modal Setup for show and hide
    const [show, setShow] = useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

// Setting state for modal form
    const [character_name, setCharacter_Name] = useState()
    const [character_race, setCharacter_Race] = useState()
    const [character_class, setCharacter_Class] = useState()





    return (
        <>
            <Modal>
                
            </Modal>
        </>
    )

}

export default ModalFormEditCharacter;
