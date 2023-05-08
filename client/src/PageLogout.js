import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { UserAuthContext } from "./context/UserAuth";

function PageLogout() {

    const history = useHistory()

    const {userAuth, setUserAuth} = useContext(UserAuthContext)

    const handleLogout = () => {
        fetch('http://127.0.0.1:5555/Logout', {
            method: 'DELETE',
        }).then(r => {
            if(r.ok){
                setUserAuth(null)
                history.push('/')
            }
        })
    }


    return (
        <>
            <h2>Would you like to log out?</h2>
            <h2>why is this still not working</h2>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default PageLogout;
