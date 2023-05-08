import React, {useContext} from 'react';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

import PageLogin from './PageLogin';
import PageMyCharacters from './PageMyCharacters';
import PageMyGroups from './PageMyGroups';
import PageLFG from './PageLFG';
import Home from './Home';
import NavBar from './NavBar';
import PageLogout from './PageLogout';

import { UserAuthProvider } from './context/UserAuth';
import { CurrentUserProvider } from './context/CurrentUser';
import { CurrentUserContext } from './context/CurrentUser';

//TODO: how to handle log out? Conditional rendering on MY pages and Login to change to logout based on current user auth state

function App() {







  return (
  <BrowserRouter>
    <>
      <CurrentUserProvider>
        <>
          <UserAuthProvider>
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
                  <Route path='/LoginCreate'>
                    <PageLogin/>
                  </Route>
                  <Route path='/Logout'>
                    <PageLogout/>
                  </Route>
                  <Route path='/'>
                    <Home/>
                  </Route>
              </Switch>
            </div>
          </UserAuthProvider>
        </>
      </CurrentUserProvider>
    </>
  </BrowserRouter>
  );
}

export default App;
