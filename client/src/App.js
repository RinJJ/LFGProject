import React, {useContext, useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './index.css'
import PageMyCharacters from './PageMyCharacters';
import PageMyGroups from './PageMyGroups';
import PageLFG from './PageLFG';
import Home from './Home';
import NavBar from './NavBar';
import PageLogin from './PageLogin';
import PageLogout from './PageLogout';
import PageCreateAcc from './PageCreateAcc';

import { UserAuthProvider } from './context/UserAuth';
import { CurrentUserContext, CurrentUserProvider } from './context/CurrentUser';

//TODO: how to handle log out? Conditional rendering on MY pages and Login to change to logout based on current user auth state

function App() {


  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

//Use Effects?

  useEffect(() => {
    fetch('/authorized')
    .then(r => {
      if(r.ok) {
        r.json().then((user) => {
          console.log(user)
          setCurrentUser(user)
        })
      }
    })
  }, [])

// Do I need my Providers of user in index.js? So I can use conditional rendering here for the "my" and LFG routes

  return (
  <BrowserRouter>
    <>
      <header>
        <NavBar/>
        <h2>nope still not showing</h2>
      </header>
      <div>
        <Switch>
            <Route path='/MyCharacters'>
              <PageMyCharacters/>
            </Route>
            <Route path='/MyGroups'>
              <PageMyGroups/>
            </Route>
            <Route path='/LFG'>
              <PageLFG/>
            </Route>
            <Route path='/Login'>
              <PageLogin/>
            </Route>
            <Route path='/CreateAcc'>
              <PageCreateAcc/>
            </Route>
            <Route path='/Logout'>
              <PageLogout/>
            </Route>
            <Route path='/'>
              <Home/>
            </Route>
        </Switch>
      </div>
    </>
  </BrowserRouter>
  );
}

export default App;
