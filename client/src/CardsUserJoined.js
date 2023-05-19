import React, {useState} from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalLeaveGroup from "./ModalLeaveGroup";
import {v4} from 'uuid'

function CardsUserJoined( { group_name, user_id, id, characters, joinedGroupsArray, setJoinedGroupsArray, deleteJoinedGroup } ) {
    return (
        <div className="col mb-4 m-1">
            <Card  className='bg-dark border-light rounded'>
                <div className="card-body">
                    <h5 className="card-title">{group_name}</h5>

                    <div>
                        Players Currently In Group:
                        <ul>
                            {characters.map(character => <li key={v4()} > {character.character_name}</li>)}
                        </ul>
                    </div>
                    <ModalLeaveGroup user_id={user_id} id={id} joinedGroupsArray={joinedGroupsArray} setJoinedGroupsArray={setJoinedGroupsArray} deleteJoinedGroup={deleteJoinedGroup} group_name={group_name}/>
                </div>
            </Card>
        </div>
    )
}

export default CardsUserJoined;
