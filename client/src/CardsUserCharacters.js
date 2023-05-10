import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalFormEditCharacter from "./ModalFormEditCharacter";
import ModalDeleteCharacter from "./ModalDeleteCharacter";
import './index.css'

function CardsUserCharacters( { character_id, character_name, character_race, character_class, deleteCharacter, editCharacter  } ) {

    //TODO: how to get current user here to then fetch cards using current user? User Context 
    // First understabd the difference between my CurrentUserContext and UserAuthContext. Is it different?

// const handleDelete = null
// const handleEdit= <ModalFormEditCharacter/>

// make the model component the button that takes the space of the button

    return (
        <Card style={{ width: '14rem' }} className='bg-dark border-light rounded'key={character_name}>
            <Card.Body>
                <Card.Title>{character_name}</Card.Title>
                    <h5 className="card-subtitle mb-2 text-muted">{character_race}</h5>
                    {/* <h5 className="card-subtitle mb-2 text-muted">{character_id}</h5> */}
                    <h5 className="card-subtitle mb-2 text-muted">{character_class}</h5>
                    <ModalFormEditCharacter character_id={character_id} character_name={character_name} character_race={character_race} character_class={character_class} editCharacter={editCharacter} deleteCharacter={deleteCharacter} />
                    <ModalDeleteCharacter character_id={character_id} deleteCharacter={deleteCharacter} />
            </Card.Body>
        </Card>
    )
}

export default CardsUserCharacters;
