import React, { createContext, useState, useEffect, useContext, useHistory } from 'react';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

import PageLogin from './PageLogin';
import PageMyCharacters from './PageMyCharacters';
import PageMyGroups from './PageMyGroups';
import PageLFG from './PageLFG';
import Home from './Home';
import NavBar from './NavBar';



function App() {


  return (
  <BrowserRouter>
    <>

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

    </>
  </BrowserRouter>
  );
}

export default App;
