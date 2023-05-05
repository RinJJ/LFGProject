import React from "react";
import {NavLink} from 'react-router-dom'

function NavBar() {


    return(
        <nav className='me-auto'>
            <NavLink className="NavLink" exact to = "./">Home</NavLink>
            <NavLink className="NavLink" to = "/MyCharacters">My Characters</NavLink>
            <NavLink className="NavLink" to = "/MyGroups">My Groups</NavLink>
            <NavLink className="NavLink" to = "/LFG">LookingForGroup</NavLink>
            <NavLink className="NavLink" to = "/LoginCreate">Login</NavLink>
        </nav>
    )


}

export default NavBar;
