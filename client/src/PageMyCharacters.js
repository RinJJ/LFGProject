import React, {useState, useContext, useEffect} from 'react'
import CardsUserCharacters from './CardsUserCharacters'
import FormCreateCharacter from './FormCreateCharacter'
import CardGroup from 'react-bootstrap/CardGroup'
import { CurrentUserContext } from "./context/CurrentUser"
import {v4} from 'uuid'


function PageMyCharacters() {


    const { currentUser } = useContext(CurrentUserContext)



    const [charactersArray, setCharactersArray] = useState()

    const addCharacter = (newCharacterObj) => {
        setCharactersArray([...charactersArray, newCharacterObj])
    }


// fetch the data we need for the cards User.characters

    useEffect(() => {
        if (currentUser) {
            fetch(`/charactersbyuser/${currentUser.id}`)
            .then(r=> r.json())
            .then(setCharactersArray)
        }
    }, [currentUser])

    const deleteCharacter = (doomedId) => {
        setCharactersArray(charactersArray.filter(character => character.id !== doomedId))
    }

    const editCharacter = (patchedCharacter) => {
        const newArray = [...charactersArray]
        const index = newArray.findIndex( e => e.id == patchedCharacter.id )
        newArray[ index ] = patchedCharacter
        setCharactersArray(newArray)
    }

console.log(charactersArray)
// Map the data we need for the cards
    const characterComponents = charactersArray?.map(character => <CardsUserCharacters key={v4()} character_id={character.id} character_name={character.character_name} character_race={character.character_race} character_class={character.character_class} deleteCharacter={deleteCharacter} editCharacter={editCharacter}/>)

// Setting state for hiding and showing New Character Form
    const [hideCharacterForm, setHideCharacterForm] = useState(true)

    const handleHideCharacterForm = () => { setHideCharacterForm(hideCharacterForm => !hideCharacterForm) }







    function FormButton({handleHideCharacterForm}) {
        return(
            <button onClick={handleHideCharacterForm} className="hideFormButton">Add a Character</button>
        )
    }









    return (
        <>
            <div>
                <h2>My Characters</h2>
            </div>
            <div className='formdiv'>
                {hideCharacterForm? <FormButton handleHideCharacterForm={handleHideCharacterForm}/> : <FormCreateCharacter addCharacter={addCharacter} handleHideCharacterForm={handleHideCharacterForm}/>}
            </div>
            <div className='carddiv'>
                <CardGroup className='grid-container'>
                    {characterComponents}
                </CardGroup>
            </div>
        </>
    )
}

export default PageMyCharacters;
