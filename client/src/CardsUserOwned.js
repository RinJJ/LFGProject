import React, {useState} from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalDeleteGroup from "./ModalDeleteGroup";
import {v4} from 'uuid'

function CardsUserOwned( { group_name, user_id, id, characters, joinedGroupsArray, setJoinedGroupsArray, deleteOwnedGroup } ) {




    return (
        <Card  className='bg-dark border-light rounded'>
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">{group_name}</h5>

        <div>
            Players Currently In Group:
            <ul>
                {characters.map(character => <li key={v4()} > {character.character_name}</li>)}
            </ul>
        </div>
            <ModalDeleteGroup user_id={user_id} id={id} joinedGroupsArray={joinedGroupsArray} setJoinedGroupsArray={setJoinedGroupsArray} />
        </div>
        </div>
        </Card>
    )
}

export default CardsUserOwned;
