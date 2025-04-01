import React from 'react';

import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/scss/defaults.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import RootComponent from './components/generic/RootComponent';
const container =  document.getElementById('root');
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.  REACT_APP_STRIPE_API_PUBLISHABLE_KEY);

const ROOT = createRoot(container);


ROOT.render(

  <React.StrictMode>
      <Elements stripe={stripePromise}>
    <RootComponent>
      
      <App />
      </RootComponent>
      </Elements>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals())
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
