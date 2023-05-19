import React, {useState} from "react";

import Card from 'react-bootstrap/Card';
import ModalJoinGroup from './ModalJoinGroup'
import {v4} from 'uuid'


function CardsGroups( { group_name, user_id, id, charactersByUserArray, characters, setGroupsArray } ) {


    
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
                <ModalJoinGroup id={id} user_id={user_id} group_name={group_name} charactersByUserArray={charactersByUserArray} setGroupsArray={setGroupsArray} />
                </div>
            </Card>
        </div>
    );
}

export default CardsGroups;
