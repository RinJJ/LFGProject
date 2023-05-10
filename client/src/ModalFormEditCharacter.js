import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'


function ModalFormEditCharacter( { key, character_id, editCharacter, deleteCharacter } ) {
// how do i bring down the previous inputs of character name,race,class
    //I should be able to edit the character by directly editing ty the id in /charactersbyid


    //TODO: I STILL NEED CHARACTER INFO PASSED INTO HERE FROM PREVIOUS COMPONENT

    const history = useHistory()

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

        const patchedCharacter = {
            character_name: character_name,
            character_race: character_race,
            character_class: character_class,
        }

        fetch(`/characters/${character_id}` , {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchedCharacter)
        })
        .then(r => {
            if(r.ok){
                r.json().then(characterObj => {
                    editCharacter( characterObj )
                })
                handleClose()
                console.log(r)
                history.push('/MyCharacters')
            }
        })
    }
        // Changing the backend is good and all but dont I need state somehwhere in fetch to change the dom? do I pass character state from PageMyCharacters
    return (
        <>
            <Button className="modalButton" variant="primary" onClick={handleShow}>Edit Character</Button>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Character {character_id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className='addForm' onSubmit={handleSubmit}>
                    <div>
                        <Form.Control onChange={handleCharacter_Name} type= 'text' name = 'character_name' />
                        <select onChange={handleCharacter_Race} name = 'character_race'>
                            <option value=''>---Select Race---</option>
                            <option value='Dragonborn'>Dragonborn</option>
                            <option value='Dwarf'>Dwarf</option>
                            <option value='Dwarf (Hill)'>Dwarf (Hill)</option>
                            <option value='Dwarf (Mountain)'>Dwarf (Mountain)</option>
                            <option value='Elf'>Elf</option>
                            <option value='Elf (Drow)'>Elf (Drow)</option>
                            <option value='Elf (High)'>Elf (High)</option>
                            <option value='Elf (Wood)'>Elf (Wood)</option>
                            <option value='Gnome'>Gnome</option>
                            <option value='Gnome (Forest)'>Gnome (Forest)</option>
                            <option value='Gnome (Rock)'>Gnome (Rock)</option>
                            <option value='Half-Elf'>Half-Elf</option>
                            <option value='Half-Orc'>Half-Orc</option>
                            <option value='Halfling'>Halfling</option>
                            <option value='Halfling (Lightfoot)'>Halfling (Lightfoot)</option>
                            <option value='Halfling (Stout)'>Halfling (Stout)</option>
                            <option value='Human'>Human</option>
                            <option value='Human (Variant)'>Human (Variant)</option>
                            <option value='Tiefling'>Tiefling</option>
                        </select>
                        <select onChange={handleCharacter_Class} name= 'character_class' >
                            <option value=''>---Select Class---</option>
                            <option value='Barbarian'>Barbarian</option>
                            <option value='Bard'>Bard</option>
                            <option value='Cleric'>Cleric</option>
                            <option value='Druid'>Druid</option>
                            <option value='Fighter'>Fighter</option>
                            <option value='Monk'>Monk</option>
                            <option value='Paladin'>Paladin</option>
                            <option value='Ranger'>Ranger</option>
                            <option value='Rogue'>Rogue</option>
                            <option value='Sorcerer'>Sorcerer</option>
                            <option value='Warlock'>Warlock</option>
                            <option value='Wizard'>Wizard</option>
                        </select>
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
