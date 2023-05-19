import React, {useState, useContext, useEffect} from 'react'
import CardsGroups from './CardsGroups'
import FormCreateGroup from './FormCreateGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/esm/Button'
import { CurrentUserContext } from "./context/CurrentUser"
import {v4} from 'uuid'

function PageLFG() {

    const { currentUser } = useContext(CurrentUserContext)



    const [groupsArray, setGroupsArray] = useState([])
    const [charactersByUserArray, setCharactersByUserArray] = useState([])
    
    
    const addGroup = (newGroupObj) => {
        setGroupsArray([...groupsArray, newGroupObj])
    }
    

    useEffect(() => {
        if(currentUser) {
        fetch(`/groupswithoutuser/${currentUser.id}`)
        .then(r=> r.json())
        .then(setGroupsArray)
        }
    }, [currentUser])

    useEffect(() => {
        if(currentUser) {
            fetch(`/charactersbyuser/${currentUser.id}`)
            .then(r=> r.json())
            .then(setCharactersByUserArray)
        }   
    }, [currentUser])

    const groupComponents = groupsArray.length > 0 ? (
        groupsArray?.map((group) => (
            <CardsGroups  
            key= {v4()} 
            {...group} 
            charactersByUserArray={charactersByUserArray} 
            groupsArray={groupsArray} 
            setGroupsArray={setGroupsArray} 

            />
        ))
    ):(
        <h5 className="card-subtitle mb-5 m-5 text-muted">Create Your Own group</h5>
    )

    const [hideGroupForm, setHideGroupForm] = useState(true)

    const handleHideGroupForm = () => { setHideGroupForm(hideGroupForm => !hideGroupForm) }

    function FormButton({handleHideGroupForm}) {
        return(
            <Button variant="outline-primary" onClick={handleHideGroupForm} className="hideFormButton">Create a Group</Button>
        )
    }




    return (
        <>
            <div>
                <h2 className='text-center mt-4'>Looking For Group</h2>
            </div>
            <div className='text-center mb-4'>
                {hideGroupForm? <FormButton handleHideGroupForm={handleHideGroupForm}/> : <FormCreateGroup addGroup={addGroup} handleHideGroupForm={handleHideGroupForm}/>}
            </div>
            <div className="row-cols-5">
                <CardGroup className='grid-container'>
                    {groupsArray ? groupComponents: <h5 className="card-subtitle mb-5 m-5 text-muted">Create Your Own group</h5>}
                </CardGroup>
            </div>
        </>
    )
}

export default PageLFG;
