import React, {useState, useContext} from 'react'
import CardsUserCharacters from './CardsUserCharacters'
import FormCreateCharacter from './FormCreateCharacter'
import CardGroup from 'react-bootstrap/CardGroup'
import { CurrentUserContext } from "./context/CurrentUser"


function PageMyCharacters() {


    const { currentUser } = useContext(CurrentUserContext)


// fetch the data we need for the cards User.characters


// Map the data we need for the cards
    // const characterComponents = currentUser.characters.map(character => <CardsUserCharacters key={character.id} character_name={character.character_name} character_race={character.character_race} characters_class={character.character_class} />)

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
                {hideCharacterForm? <FormButton handleHideCharacterForm={handleHideCharacterForm}/> : <FormCreateCharacter handleHideCharacterForm={handleHideCharacterForm}/>}
            </div>
            <div className='carddiv'>
                <CardGroup className='grid-container'>
                    {/* {characterComponents} */}
                </CardGroup>
            </div>
        </>
    )
}

export default PageMyCharacters;
