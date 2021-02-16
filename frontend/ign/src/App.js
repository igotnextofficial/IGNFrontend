import logo from './logo.svg';
import './App.css';
import {Request}  from './features/http/Request';

import {Navigation}  from './features/navigation/Navigation';

function App() {
   Request.setDestination("http://ignuserapi.ign.test/api/test")
;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Navigation/>
      
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
