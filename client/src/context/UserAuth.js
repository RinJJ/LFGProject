import React, {useEffect, useState, useffect} from "react";

const UserAuthContext = React.createContext()


function UserAuthProvider() {
  
  const [userAuth, setUserAuth] = useState(null)

  useEffect(() => {
    async function checkAuthStatus() {
      const response = await fetch('http://127.0.0.1:5555/authorized')
      const data = await response.json();
      setUserAuth(data.userAuth)
    }
  })




  return 
}

export { UserAuthContext, UserAuthProvider } 
