import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'
import {v4} from 'uuid'

function ModalJoinGroup( {id, group_name, charactersByUserArray, groupsArray, setGroupsArray  } ) {

    const history = useHistory()
    const [show, setShow] = useState()
    const handleClose = () => setShow(false);

    const handleShow = () => {setShow(show => !show)}

    // console.log("this group ID" ,id)

    const [character_id, setCharacter_id] = useState()

    const handleCharacter = (e) => {
        setCharacter_id(e.target.value)
        // console.log("This is Character ID", e.target.value)
    }
    // console.log(groupsArray[0].character_groups)

    const handleJoin = (e) => {
        e.preventDefault();

        const index = (id -1)
        // console.log('this is groupsArray[index].character_groups', groupsArray[index].character_groups )
        const newCharacterGroup = {
            character_id: character_id,
            group_id: id
        }
        // console.log(newCharacterGroup);
        fetch('/charactergroups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCharacterGroup)
        })
        .then(r => {
            if(r.ok){
                r.json().then(thisGroup => {
                    setGroupsArray(thisGroup)
                })}
            })
        
    }




    return (
        <Form className='addForm'>

                <select onChange={handleCharacter}>
                    <option value="">---Select A Character---</option>
                    {charactersByUserArray.map(cObj => {
                        return (
                            <option value={cObj.id} key={v4()}> {cObj.character_name} </option>
                        )
                    })
                    }
                </select>

            <Button onClick={handleJoin}>JoinGroup</Button>
        </Form>
        
    );

}

export default ModalJoinGroup;
