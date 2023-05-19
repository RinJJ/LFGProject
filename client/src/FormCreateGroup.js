import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { CurrentUserContext } from './context/CurrentUser'
import './index.css'


function FormCreateGroup( { handleHideGroupForm, addGroup } ) {

    const {currentUser} = useContext(CurrentUserContext)



    // Setting state for form
    const [group_name, setGroup_Name] = useState('')

    // Handle Changes to form
    const handleGroup_Name = (e) => { setGroup_Name(e.target.value) }

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const newGroup = {
            group_name: group_name,
            user_id: currentUser.id,
        }

        // insert adding the group to state here... actually probably better to do it in the .then of fetch

        fetch('/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newGroup)
        })
        .then(r => {
            if(r.ok){
                r.json().then(thisgroup => {
                    addGroup(thisgroup);
                })
                setGroup_Name('')
                handleHideGroupForm()
            }
        })
    }





    return (
    <Form className='addForm' onSubmit={handleSubmit}>
            <Form.Control 
                onChange={handleGroup_Name} 
                type= 'text' 
                name = 'group_name' 
                placeholder='Insert Name Group' 
                style={{ width: '400px', margin: '0 auto' }}
            />
            <Button variant="outline-primary" className='mx-2 mt-2' type='submit'>Add Group</Button>
            <Button variant="outline-secondary" className='mx-2 mt-2' onClick={handleHideGroupForm}>Close Form</Button>
    </Form>

    )
}

export default FormCreateGroup;
