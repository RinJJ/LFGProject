import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { UserAuthProvider } from './context/UserAuth';
import { CurrentUserProvider } from './context/CurrentUser';
import'./index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserAuthProvider>
      <CurrentUserProvider>
          <App />
      </CurrentUserProvider>
    </UserAuthProvider>
);



