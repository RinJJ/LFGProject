import React, {useContext} from "react";
import {NavLink} from 'react-router-dom'
import { UserAuthContext } from "./context/UserAuth";

function NavBar() {

const {userAuth, setUserAuth} = useContext(UserAuthContext)

    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="NavLink" exact to = "./">Home</NavLink>
            <NavLink className="NavLink" to = "/MyCharacters">My Characters</NavLink>
            <NavLink className="NavLink" to = "/MyGroups">My Groups</NavLink>
            <NavLink className="NavLink" to = "/LFG">LookingForGroup</NavLink>
            <NavLink className="NavLink" to = "/Login">Login</NavLink>
            <NavLink className="NavLink" to = "/CreateAcc">Create Account</NavLink>
            <NavLink className="NavLink" to = "/Logout">Logout</NavLink>
        </nav>
    )
}

export default NavBar;
