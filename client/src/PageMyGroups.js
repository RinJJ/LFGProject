import React, {useState, useContext, useEffect} from 'react'
import CardsUserOwned from './CardsUserOwned'
import CardsUserJoined from './CardsUserJoined'
import FormCreateGroup from './FormCreateGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import { CurrentUserContext } from "./context/CurrentUser"
import {v4} from 'uuid'

function PageMyGroups() {

    const { currentUser } = useContext(CurrentUserContext)



    const [ownedGroupsArray, setOwnedGroupsArray] = useState()
    const [joinedGroupsArray, setJoinedGroupsArray] = useState()

    const [hideGroupForm, setHideGroupForm] = useState(true)

    const handleHideGroupForm = () => { setHideGroupForm(hideGroupForm => !hideGroupForm) }

    function FormButton({handleHideGroupForm}) {
        return(
            <button onClick={handleHideGroupForm} className="hideFormButton">Add a Group</button>
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

    const ownedGroupsComponents = ownedGroupsArray?.map(group => <CardsUserOwned key= {v4()} {...group} ownedGroupsArray={ownedGroupsArray} setOwnedGroupsArray={setOwnedGroupsArray} deleteOwnedGroup={deleteOwnedGroup} /> )
    const joinedGroupsComponents = joinedGroupsArray?.map(group => <CardsUserJoined key= {v4()} {...group} joinedGroupsArray={joinedGroupsArray} setJoinedGroupsArray={setJoinedGroupsArray} deleteJoinedGroup={deleteJoinedGroup}/> )















    return (
        <>
            <div>
                <h2>My Groups</h2>
            </div>
            <div className='formdiv'>
                {hideGroupForm? <FormButton handleHideGroupForm={handleHideGroupForm}/> : <FormCreateGroup addGroup={addGroup} handleHideGroupForm={handleHideGroupForm}/>}
            </div>
            <div className='carddiv'>
                <h2>Groups {currentUser.username} owns</h2>
                <CardGroup className='grid-container'>
                    {ownedGroupsComponents}
                </CardGroup>
            </div>
            <div className='carddiv'>
            <h2>Groups {currentUser.username} is in</h2>
                <CardGroup className='grid-container'>
                    {joinedGroupsComponents}
                </CardGroup>
            </div>
        </>
)
}

export default PageMyGroups;
