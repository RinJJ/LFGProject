import React, {useContext} from "react";
import {NavLink} from 'react-router-dom'
import { CurrentUserContext } from "./context/CurrentUser";

function NavBar() {

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="NavLink" exact to="/">Home</NavLink>
            
            {currentUser ? (
                <>
                    <NavLink className="NavLink" to="/MyCharacters">My Characters</NavLink>
                    <NavLink className="NavLink" to="/MyGroups">My Groups</NavLink>
                    <NavLink className="NavLink" to="/LFG">LookingForGroup</NavLink>
                    <NavLink className="NavLink" to="/Logout">Logout</NavLink>
                </>
            ) : (
                <>
                    <NavLink className="NavLink" to="/Login">Login</NavLink>
                    <NavLink className="NavLink" to="/CreateAcc">Create Account</NavLink>
                </>
            )}
        </nav>
    )
}

export default NavBar;
