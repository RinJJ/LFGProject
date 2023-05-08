import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './index.css'


function FormCreateGroup( { handleHideGroupForm } ) {





    // Setting state for form
    const [group_name, setGroup_Name] = useState('')

    // Handle Changes to form
    const handleGroup_Name = (e) => { setGroup_Name(e.target.value) }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newGroup = {
            group_name: group_name,

        }

        // insert adding the group to state here... actually probably better to do it in the .then of fetch

        fetch('http://127.0.0.1:5555/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newGroup)
        })
        .then(r => {
            if(r.ok){
                setGroup_Name('')
                handleHideGroupForm()
            }
        })
    }





    return (
    <Form className='addForm' onSubmit={handleSubmit}>
            <Form.Control onChange={handleGroup_Name} type= 'text' name = 'group_name' placeholder='Name Group' />
            <Button className='add-button' type='submit'>Add Group</Button>
            <Button className='add-button' onClick={handleHideGroupForm}>Close Form</Button>
    </Form>

    )
}

export default FormCreateGroup;
