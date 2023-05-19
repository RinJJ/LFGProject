import React, {useContext} from "react";
import {NavLink} from 'react-router-dom'
import { CurrentUserContext } from "./context/CurrentUser";

function NavBar() {

    const {currentUser} = useContext(CurrentUserContext)

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container d-flex justify-content-center">
                <NavLink className="NavLink" exact to="/">Home</NavLink>
                
                {currentUser ? (
                    <>
                        <NavLink className="NavLink" to="/MyCharacters">My Characters</NavLink>
                        <NavLink className="NavLink" to="/MyGroups">My Groups</NavLink>
                        <NavLink className="NavLink" to="/LFG">LFG</NavLink>
                        <NavLink className="NavLink" to="/Logout">Logout</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="NavLink" to="/Login">Login</NavLink>
                        <NavLink className="NavLink" to="/CreateAcc">Create Account</NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default NavBar;
