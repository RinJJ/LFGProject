import React from "react";

function CardsGroups() {

    //TODO: how to get current user here to then fetch cards using

    const handleDelete = null

    fetch('http://127.0.0.1:5555/groups')


    return (
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{group_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user_id}</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button class="btn btn-primary" onClick={handleDelete}>Delete</button>
            <button class="btn btn-primary" onClick={handleEdit}>Edit</button>
        </div>
        </div>
    );
}

export default CardsGroups;
