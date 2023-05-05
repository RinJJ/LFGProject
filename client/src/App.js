import React, { createContext, useState, useEffect, useContext, useHistory } from 'react';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

import PageLogin from './PageLogin';
import PageMyCharacters from './PageMyCharacters';
import PageMyGroups from './PageMyGroups';
import PageLFG from './PageLFG';
import Home from './Home';
import NavBar from './NavBar';

import { UserAuthProvider } from './context/UserAuth';

//TODO: how to handle log out? Conditional rendering on MY pages and Login to change to logout based on current user auth state

function App() {


  return (
  <BrowserRouter>
    <>
      <UserAuthProvider>
        <header>
          <NavBar/>
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
              <Route path='/LoginCreate'>
                <PageLogin/>
              </Route>
              <Route path='/'>
                <Home/>
              </Route>
          </Switch>
        </div>
        </UserAuthProvider>

    </>
  </BrowserRouter>
  );
}

export default App;
