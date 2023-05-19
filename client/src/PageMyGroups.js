import React, {useState, useContext, useEffect} from 'react'
import CardsUserOwned from './CardsUserOwned'
import CardsUserJoined from './CardsUserJoined'
import FormCreateGroup from './FormCreateGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/esm/Button'
import { CurrentUserContext } from "./context/CurrentUser"
import {v4} from 'uuid'

function PageMyGroups() {

    const { currentUser } = useContext(CurrentUserContext)

    const [ownedGroupsArray, setOwnedGroupsArray] = useState([])
    const [joinedGroupsArray, setJoinedGroupsArray] = useState([])

    const [hideGroupForm, setHideGroupForm] = useState(true)

    const handleHideGroupForm = () => { setHideGroupForm(hideGroupForm => !hideGroupForm) }

    function FormButton({handleHideGroupForm}) {
        return(
            <Button variant="outline-primary" onClick={handleHideGroupForm} className="hideFormButton">Create a Group</Button>
        )
    }

    const addGroup = (newGroupObj) => {
        setOwnedGroupsArray([...ownedGroupsArray, newGroupObj])
    }

    const deleteOwnedGroup = (doomedId) => {
        setOwnedGroupsArray(ownedGroupsArray.filter(group => group.id !== doomedId))
    }
    const deleteJoinedGroup = (doomedId) => {
        setJoinedGroupsArray(joinedGroupsArray.filter(group => group.id !== doomedId))
    }


    useEffect(() => {
        if(currentUser) {
            fetch(`/groupsownedbyuser/${currentUser.id}`)
            .then(r => r.json())
            .then(setOwnedGroupsArray)
        }
    }, [currentUser]);


    useEffect(() => {
        if(currentUser) {
            fetch(`/groupsuserisin/${currentUser.id}`)
            .then(r => r.json())
            .then(setJoinedGroupsArray)
        }
    }, [currentUser]);

    const ownedGroupsComponents = ownedGroupsArray.length > 0 ? (
        ownedGroupsArray.map((group) => (
            <CardsUserOwned
                key={v4()}
                {...group}
                ownedGroupsArray={ownedGroupsArray}
                setOwnedGroupsArray={setOwnedGroupsArray}
                deleteOwnedGroup={deleteOwnedGroup}
            />
        ))
        ) : (
            <h5 className="card-subtitle mb-5 m-5 text-muted">Create Your Own group</h5>
        );
    
    const joinedGroupsComponents = joinedGroupsArray.length > 0 ? (
        joinedGroupsArray.map((group) => (
            <CardsUserJoined
                key={v4()}
                {...group}
                joinedGroupsArray={joinedGroupsArray}
                setJoinedGroupsArray={setJoinedGroupsArray}
                deleteJoinedGroup={deleteJoinedGroup}
            />
        ))
        ) : (
            <h5 className="card-subtitle mb-5 m-5 text-muted">Join A Group On The LFG Page</h5>
        );



    return (
        <>
            <div className='text-center mb-2'>
                <h2 className='mt-4'>My Groups</h2>
            </div>
            <div className='text-center mb-4'>
                {hideGroupForm? <FormButton handleHideGroupForm={handleHideGroupForm}/> : <FormCreateGroup addGroup={addGroup} handleHideGroupForm={handleHideGroupForm}/>}
            </div>
            <div className='carddiv'>
                <h2 className='m-3'>Groups {currentUser && currentUser.username} owns</h2>
                <CardGroup className="row-cols-5">
                    {ownedGroupsArray ? ownedGroupsComponents : <p>No owned groups available.</p>}
                </CardGroup>
            </div>
            <div className='carddiv'>
            <h2 className='m-3'>Groups {currentUser && currentUser.username} is in</h2>
            <CardGroup className="row-cols-5">
                {joinedGroupsArray ? joinedGroupsComponents : <p>No joined groups available.</p>}
            </CardGroup>
            </div>
        </>
)
}

export default PageMyGroups;
