import React, {useState, useContext} from 'react'
import CardsUserGroups from './CardsUserGroups'
import FormCreateGroup from './FormCreateGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import { CurrentUserContext } from "./context/CurrentUser"

function PageMyGroups() {


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
                {hideGroupForm? <FormButton handleHideGroupForm={handleHideGroupForm}/> : <FormCreateGroup handleHideGroupForm={handleHideGroupForm}/>}
            </div>
            <div className='carddiv'>
                <CardGroup className='grid-container'>
                    {/* {groupComponents} */}
                </CardGroup>
            </div>
        </>
)
}

export default PageMyGroups;
