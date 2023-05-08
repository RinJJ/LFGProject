import React, {useState} from "react";

const CurrentUserContext = React.createContext()

function CurrentUserProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)

    return <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>{children}</CurrentUserContext.Provider>
}

export {CurrentUserContext, CurrentUserProvider};
