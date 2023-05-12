import React, {useState} from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalJoinGroup from './ModalJoinGroup'
import CardsGroupCharacters from "./CardsGroupCharacters";
import {v4} from 'uuid'


function CardsGroups( { group_name, user_id, id, charactersByUserArray, character_groups, characters, groupsArray, setGroupsArray } ) {

// console.log('groupsarray.character?', groupsArray[0].characters)


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
            <ModalJoinGroup id={id} user_id={user_id} group_name={group_name} charactersByUserArray={charactersByUserArray} groupsArray={groupsArray} setGroupsArray={setGroupsArray} />
        </div>
        </div>
        </Card>
    );
}

export default CardsGroups;
