import React from "react";
import Card from 'react-bootstrap/Card';
import ModalFormEditCharacter from "./ModalFormEditCharacter";
import ModalDeleteCharacter from "./ModalDeleteCharacter";


function CardsUserCharacters( { character_id, character_name, character_race, character_class, deleteCharacter, editCharacter  } ) {



    return (
        <div className="col mb-4 m-1">
            <Card className=' bg-dark border-light rounded' key={character_name}>
                <Card.Body>
                    <Card.Title>{character_name}</Card.Title>
                        <h5 className="card-subtitle mb-2 text-muted">{character_race}</h5>
                        <h5 className="card-subtitle mb-2 text-muted">{character_class}</h5>
                        <ModalFormEditCharacter character_id={character_id} currentCharacter_name={character_name} character_race={character_race} character_class={character_class} editCharacter={editCharacter} deleteCharacter={deleteCharacter} />
                        <ModalDeleteCharacter character_id={character_id} deleteCharacter={deleteCharacter} currentCharacter_name={character_name} />
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardsUserCharacters;
