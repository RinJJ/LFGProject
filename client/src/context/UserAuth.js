import React, {useEffect, useState} from "react";


const UserAuthContext = React.createContext()

function UserAuthProvider({children}) {
  
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    async function checkAuthStatus() {
      const response = await fetch('http://127.0.0.1:5555/authorized')
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
