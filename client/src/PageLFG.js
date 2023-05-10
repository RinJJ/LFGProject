import React, {useState, useContext, useEffect} from 'react'
import CardsGroups from './CardsGroups'
import FormCreateGroup from './FormCreateGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import { CurrentUserContext } from "./context/CurrentUser"

function PageLFG() {

    const { currentUser } = useContext(CurrentUserContext)



    const [groupsArray, setGroupsArray] = useState()
    const [charactersByUserArray, setCharactersByUserArray] = useState([])

    const addGroup = (newGroupObj) => {
        setGroupsArray([...groupsArray, newGroupObj])
    }
    console.log("this is groupsarray", groupsArray)

    useEffect(() => {
        fetch(`/groups/`)
        .then(r=> r.json())
        .then(setGroupsArray)
    }, [])

    useEffect(() => {
        if(currentUser) {
            fetch(`/charactersbyuser/${currentUser.id}`)
            .then(r=> r.json())
            .then(setCharactersByUserArray)
        }   
    }, [currentUser])

    const groupComponents = groupsArray?.map(group => <CardsGroups key={group.id} {...group} charactersByUserArray={charactersByUserArray} />)

    const [hideGroupForm, setHideGroupForm] = useState(true)

    const handleHideGroupForm = () => { setHideGroupForm(hideGroupForm => !hideGroupForm) }

    function FormButton({handleHideGroupForm}) {
        return(
            <button onClick={handleHideGroupForm} className="hideFormButton">Add a Group</button>
        )
    }




    return (
        <>
            <div>
                <h2>My Groups</h2>
            </div>
            <div className='formdiv'>
                {hideGroupForm? <FormButton handleHideGroupForm={handleHideGroupForm}/> : <FormCreateGroup addGroup={addGroup} handleHideGroupForm={handleHideGroupForm}/>}
            </div>
            <div className='carddiv'>
                <CardGroup className='grid-container'>
                    {groupComponents}
                </CardGroup>
            </div>
        </>
    )
}

export default PageLFG;
