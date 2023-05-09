import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'
import { CurrentUserContext } from './context/CurrentUser'
import { UserAuthContext } from './context/UserAuth'


function FormCreateCharacter( { handleHideCharacterForm, addCharacter } ) {

//TODO: This

const {currentUser} = useContext(CurrentUserContext)
const {UserAuth} = useContext(UserAuthContext)


// Setting state for form
    const [character_name, setCharacter_Name] = useState('')
    const [character_race, setCharacter_Race] = useState('')
    const [character_class, setCharacter_Class] = useState('')

// Handle changes to form
    const handleCharacter_Name = (e) => { setCharacter_Name(e.target.value) }
    const handleCharacter_Race = (e) => { setCharacter_Race(e.target.value) }
    const handleCharacter_Class = (e) => { setCharacter_Class(e.target.value) }
    const handleCurrentUser = (e) => console.log(currentUser.id)


// Handle Submit and Patch request? I should also change state of show at the end of fetch.

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCharacter = {
            character_name: character_name,
            character_race: character_race,
            character_class: character_class,
            user_id: currentUser.id
        }

        // insert adding the character to state here... actually probably better to do it in the .then of fetch

        fetch('/characters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newCharacter)
        })
        .then(r => {
            if(r.ok){
                setCharacter_Name('')
                setCharacter_Race('')
                setCharacter_Class('')
                addCharacter(newCharacter)

                handleHideCharacterForm()
            }
        })


    }






// How do I make one of the clicks on the cards pop up with the edit Character Modal Component I made?
    return (
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
            <Button className='add-button' type='submit'>Add Character</Button>
            <Button className='add-button' onClick={handleHideCharacterForm}>Close Form</Button>
            <Button className='add-button' onClick={handleCurrentUser}>What is current User ID</Button>
        </Form>


    )
}

export default FormCreateCharacter;
