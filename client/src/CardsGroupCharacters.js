import React from "react";
import Card from 'react-bootstrap/Card';

function CardsGroupCharacters( { character_name, character_race, character_class } ) {





    return (

        <Card  className='bg-dark border-light rounded'>
            <Card.Body>
                <Card.Title>{character_name}</Card.Title>
                    <h5 className="card-subtitle mb-2 text-muted">{character_race}</h5>
                    {/* <h5 className="card-subtitle mb-2 text-muted">{character_id}</h5> */}
                    <h5 className="card-subtitle mb-2 text-muted">{character_class}</h5>
            </Card.Body>
        </Card>
    )
}

export default CardsGroupCharacters;
