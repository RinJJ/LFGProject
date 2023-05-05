import React, {useState} from "react";

const CurrentUserContext = React.createContext()

function CurrentUserProvider({children}) {

    const [CurrentUser, setCurrentUser] = useState(null)

    return <CurrentUserContext.Provider value={{ CurrentUser, setCurrentUser }}></CurrentUserContext.Provider>
}

export {CurrentUserContext, CurrentUserProvider};
