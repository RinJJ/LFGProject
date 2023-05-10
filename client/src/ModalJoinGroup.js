import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'

function ModalJoinGroup( {id, group_name, charactersByUserArray  } ) {

    const history = useHistory()
    const [show, setShow] = useState()
    const handleClose = () => setShow(false);

    const handleShow = () => {setShow(show => !show)}

    console.log("this group ID" ,id)

    const [character_id, setCharacter_id] = useState()

    const handleCharacter = (e) => {
        setCharacter_id(e.target.value)
        console.log("This is Character ID", e.target.value)
    }

    const handleJoin = (e) => {
        e.preventDefault();

        const newCharacterGroup = {
            character_id: character_id,
            group_id: id
        }
        console.log(newCharacterGroup);
        fetch('/charactergroups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCharacterGroup)
        })
        .then(r => {
            if(r.ok){
                //insert statechange for group from 2 levels up
            }
        })

    }




    return (
        <Form className='addForm'>

                <select onChange={handleCharacter}>
                    <option value="">---Select A Character---</option>
                    {charactersByUserArray.map(cObj => {
                        return (
                            <option value={cObj.id}> {cObj.character_name} </option>
                        )
                    })
                    }
                </select>

            <Button onClick={handleJoin}>JoinGroup</Button>
        </Form>
        
    );

}

export default ModalJoinGroup;
