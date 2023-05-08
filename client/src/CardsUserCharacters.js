import React from "react";
import ModalFormEditCharacter from "./ModalFormEditCharacter";

function CardsUserCharacters( { key, character_name, character_race, character_class } ) {

    //TODO: how to get current user here to then fetch cards using current user? User Context 
    // First understabd the difference between my CurrentUserContext and UserAuthContext. Is it different?

const handleDelete = null
const handleEdit= <ModalFormEditCharacter/>

    return (
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={handleDelete}>Delete</button>
            <button class="btn btn-primary" onClick={handleEdit}>Edit</button>
        </div>
        </div>
    )
}

export default CardsUserCharacters;
