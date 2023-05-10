import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




function CardsUserGroups( { key, group_name, user_id } ) {

    //TODO: how to get current user here to then fetch cards using

    //TODO: how to make it if current User is the user_id(owner) of the group that they get a button for group delete
    //TODO: how to make it if current User is a CharacterGroup that they get a button to leave the group ie: Delete the character group


    const handleDelete = null
    const handleLeave = null


    return (
        <Card style={{ width: '14rem' }} className='bg-dark border-light rounded'>
        <div class="card-body">
            <h5 class="card-title">{group_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user_id}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={handleDelete}>Delete</button>
            <button class="btn btn-primary" onClick={handleLeave}>Leave</button>
        </div>
        </Card>
    )
}

export default CardsUserGroups;
