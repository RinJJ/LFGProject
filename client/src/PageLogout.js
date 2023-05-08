import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { UserAuthContext } from "./context/UserAuth";
import { CurrentUserContext } from "./context/CurrentUser";

function PageLogout() {

    const history = useHistory()

    const {userAuth, setUserAuth} = useContext(UserAuthContext)
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    const handleLogout = () => {
        fetch('/Logout', {
            method: 'DELETE',
        }).then(r => {
            if(r.ok){
                setUserAuth(null)
                setCurrentUser(null)
                history.push('/')
            }
        })
    }


    return (
        <>
            <h2>Would you like to log out?</h2>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default PageLogout;
