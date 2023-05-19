import React, {useContext} from "react";
import {useHistory} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { UserAuthContext } from "./context/UserAuth";
import { CurrentUserContext } from "./context/CurrentUser";
import {Image} from 'react-bootstrap'

function PageLogout() {

    const history = useHistory()

    const {userAuth, setUserAuth} = useContext(UserAuthContext)
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE',
        }).then(r => {
            if(r.ok){
                setUserAuth(null)
                setCurrentUser(null)
                history.push('/')
                console.log(userAuth)
                console.log(currentUser)
            }
        })
    }


    return (
        <>
                <h2 className="text-center mt-4">Would you like to log out?</h2>
                <div className="d-flex justify-content-center mt-3">
                <Button variant="outline-danger"  onClick={handleLogout}>Logout</Button>
                </div>
                <div className="text-center">
                    <Image className='m-2' style={{ width: '70%', height: '70%' }} src='https://assetsio.reedpopcdn.com/welcome-to-wildemount-album-cover.png?width=1600&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp' alt='logoutbg' fluid />
                </div>
        </>
    )
}

export default PageLogout;
