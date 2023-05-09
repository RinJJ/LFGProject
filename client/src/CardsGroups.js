import React from "react";

function CardsGroups( { key, group_name, user_id } ) {

    //TODO: how to get current user here to then fetch cards using
    //TODO: how to select a group to join with a modal and a character select dro


    const handleJoin = null
    // join is a post to character_groups that will use a dropdown populated with MyCharacters



    return (
        <div class="card">
        <div class="card-body">
            <h5 class="card-title">{group_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user_id}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={handleJoin}>Join</button>
        </div>
        </div>
    );
}

export default CardsGroups;
