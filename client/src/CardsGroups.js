import React from "react";

function CardsGroups( { key, group_name, user_id } ) {

    //TODO: how to get current user here to then fetch cards using
    //TODO: how to select a group to join with a modal and a character select dro


    const handleJoin = null

    fetch('http://127.0.0.1:5555/groups')


    return (
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{group_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user_id}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={handleJoin}>Leave</button>
        </div>
        </div>
    );
}

export default CardsGroups;
