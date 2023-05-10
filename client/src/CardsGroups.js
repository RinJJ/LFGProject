import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ModalJoinGroup from './ModalJoinGroup'
import CardsGroupCharacters from "./CardsGroupCharacters";


function CardsGroups( { group_name, user_id, key, id, charactersByUserArray, character_groups, characters } ) {

    //TODO: how to get current user here to then fetch cards using
    //TODO: how to select a group to join with a modal and a character select dro
    // const character_groupsComponents = character_groups.map( character=> <CardsGroupCharacters key={character.id} character_name={character.character_name} character_race={character.character_race} character_class={character.character_class} />)
    // console.log(character_groupsComponents)
    const handleJoin = null
    // join is a post to character_groups that will use a dropdown populated with MyCharacters

console.log("this is the key I need", id)

    return (
        <Card  className='bg-dark border-light rounded'>
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">{group_name}</h5>
            <h5 className="card-subtitle mb-2 text-muted">current user:{user_id}</h5>
            <div>
                Players Currently In Group:
                <ul>
                    {characters.map(character => <li>{character.character_name}</li>)}
                </ul>
            </div>
            <ModalJoinGroup id={id} user_id={user_id} group_name={group_name} charactersByUserArray={charactersByUserArray} />
        </div>
        </div>
        </Card>
    );
}

export default CardsGroups;
