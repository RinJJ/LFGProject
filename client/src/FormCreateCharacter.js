import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dropdown from 'react-bootstrap/Dropdown'  
import './index.css'


function FormCreateCharacter( { handleHideCharacterForm } ) {

//TODO: This




// Setting state for form
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

        const newCharacter = {
            character_name: character_name,
            character_race: character_race,
            character_class: character_class,
        }

        // insert adding the character to state here... actually probably better to do it in the .then of fetch

        fetch('http://127.0.0.1:5555/characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newCharacter)
        })
        .then(r => {
            if(r.ok){
                setCharacter_Name('')
                setCharacter_Race('')
                setCharacter_Class('')

                handleHideCharacterForm()
            }
        })


    }






// How do I make one of the clicks on the cards pop up with the edit Character Modal Component I made?
    return (
        <Form className='addForm' onSubmit={handleSubmit}>
            <div>
                <Form.Control onChange={handleCharacter_Name} type='text' name = 'character_name' placeholder='Name' />
                <Form.Control onChange={handleCharacter_Race} type='text' name = 'character_race' placeholder='Race' />
                <Dropdown.Button align="end" variant='primary' id='dropdown-autoclose-inside' autoClose='inside'>
                    <Dropdown.Header>Choose Race</Dropdown.Header>
                    <Dropdown.Divider/>
                    <Dropdown.Item onChange={handleCharacter_Race}>DragonBorn</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Dwarf</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Dwarf (Hill)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Dwarf (Mountain)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Elf</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Elf (Drow)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Elf (High)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Elf Wood</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Gnome (Forest)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Gnome</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Gnome (Rock)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Half-Elf</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Half-Orc</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Halfling</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Halfling (Lightfoot)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Halfling (Stout)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Human</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Human (Variant)</Dropdown.Item>
                    <Dropdown.Item onChange={handleCharacter_Race}>Tiefling</Dropdown.Item>
                </Dropdown.Button>
                <Form.Control onChange={handleCharacter_Class} type='text' name = 'character_class' placeholder= 'Class' />
            </div>
            <Button className='add-button' type='submit'>Add Character</Button>
            <Button className='add-button' onClick={handleHideCharacterForm}>Close Form</Button>
        </Form>


    )
}

export default FormCreateCharacter;
