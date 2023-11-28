import React from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/defaults.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './Providers/UserProvider';
import User from './Models/Users/User';
import RootComponent from './Components/Generic/RootComponent';
const container =  document.getElementById('root');

const ROOT = createRoot(container);


ROOT.render(

  <React.StrictMode>
    <RootComponent>
      <App />
      </RootComponent>

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
