import './App.css';
import { pages } from './routes/web';
import  Navigation  from './features/Navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';

import { BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import Login from './pages/authentication/Login';
import { Button } from '@mui/material';
import User from './models/users/User';

const user = new User();


function App() {
    const isAuthenticated = user.isLoggedIn();
   const routeComponents = pages.map(({slug,component,useProtected},key) =>
   { 
   
      return useProtected ? 
      <ProtectedRoutes key={key} path={slug} exact element={component} isAuthenticated={isAuthenticated} /> : 
      <Route key={key} path={slug} exact element={component} /> 
    }
   );
  return (

    <div className="App">
    
 

        <Router>
        {/* <Navigation/> */}
        <Routes>
           <Route path='' element={<ProtectedRoutes isAuthenticated={user.isLoggedIn()} />}>
              <Route path='/dashboard' element={<Dashboard/>}/>
              
           </Route>
           <Route path='/login' element={<Login/>}/>
        </Routes>
        </Router>

      {/* <Navigation/> */} 

     
 

    </div>
  );
}

export default App;
