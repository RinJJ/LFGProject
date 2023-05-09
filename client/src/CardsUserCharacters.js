import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalFormEditCharacter from "./ModalFormEditCharacter";
import './index.css'

function CardsUserCharacters( { key, character_name, character_race, character_class } ) {

    //TODO: how to get current user here to then fetch cards using current user? User Context 
    // First understabd the difference between my CurrentUserContext and UserAuthContext. Is it different?

// const handleDelete = null
// const handleEdit= <ModalFormEditCharacter/>

// make the model component the button that takes the space of the button

    return (
        <Card style={{ width: '14rem' }} className='bg-dark border-light rounded'>
            <Card.Body>
                <Card.Title>{character_name}</Card.Title>
                    <h5 class="card-subtitle mb-2 text-muted">{character_race}</h5>
                    <h5 class="card-subtitle mb-2 text-muted">{character_class}</h5>
                    {/* <button class="btn btn-primary" onClick={handleDelete}>Delete</button>
                    <button class="btn btn-primary" onClick={handleEdit}>Edit</button> */}
            </Card.Body>
        </Card>
    )
}

export default CardsUserCharacters;
