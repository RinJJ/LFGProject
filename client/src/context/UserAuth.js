import React, {useEffect, useState} from "react";


const UserAuthContext = React.createContext()

function UserAuthProvider({children}) {
  
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    async function checkAuthStatus() {
      const response = await fetch('/authorized')
      const data = await response.json();
      setUserAuth(data.userAuth)
    }
  })




  return (
  <UserAuthContext.Provider value={{ userAuth, setUserAuth }} >
    {children}
  </UserAuthContext.Provider >
  )
}

export { UserAuthContext, UserAuthProvider } ;
