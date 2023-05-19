import React, {useState, useContext, useEffect} from 'react'
import CardsUserCharacters from './CardsUserCharacters'
import FormCreateCharacter from './FormCreateCharacter'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/esm/Button'
import { CurrentUserContext } from "./context/CurrentUser"
import {v4} from 'uuid'


function PageMyCharacters() {


    const { currentUser } = useContext(CurrentUserContext)

    const [charactersArray, setCharactersArray] = useState([])

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
        const index = newArray.findIndex( e => e.id === patchedCharacter.id )
        newArray[ index ] = patchedCharacter
        setCharactersArray(newArray)
    }


// Map the data we need for the cards
    const characterComponents = charactersArray.length > 0 ? (
        charactersArray?.map((character) => (
            <CardsUserCharacters 
                key={v4()} 
                character_id={character.id} 
                character_name={character.character_name} 
                character_race={character.character_race} 
                character_class={character.character_class} 
                deleteCharacter={deleteCharacter} 
                editCharacter={editCharacter}
            />
        ))
    ): (
        <h5 className="card-subtitle mb-5 m-5 text-muted">Create a New Character Above</h5>
    );


// Setting state for hiding and showing New Character Form
    const [hideCharacterForm, setHideCharacterForm] = useState(true)

    const handleHideCharacterForm = () => { setHideCharacterForm(hideCharacterForm => !hideCharacterForm) }

    function FormButton({handleHideCharacterForm}) {
        return(
            <Button variant='outline-primary' onClick={handleHideCharacterForm} className="hideFormButton">Add a Character</Button>
        )
    }



    return (
        <>
            <div className='text-center mb-2'>
                <h2 className='mt-4'>My Characters</h2>
            </div>
            <div className='text-center mb-4'>
                {hideCharacterForm? <FormButton handleHideCharacterForm={handleHideCharacterForm}/> : <FormCreateCharacter addCharacter={addCharacter} handleHideCharacterForm={handleHideCharacterForm}/>}
            </div>
            <div>
                <CardGroup className="row-cols-5">
                    {charactersArray? characterComponents: <h5 className="card-subtitle mb-5 m-5 text-muted">Create a New Character Above</h5>}
                </CardGroup>
            </div>
        </>
    )
}

export default PageMyCharacters;
