import './App.css';
import { pages } from './routes/web';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import  Navigation  from './features/Navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';
import Ignlogo from './components/Ignlogo';

import { BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import Login from './pages/authentication/Login';
import Logout from './pages/authentication/Logout';

import RootComponent from './components/RootComponent';
import { useContext } from 'react';
import { UserContext } from './Contexts/UserContext';
import { useUser } from './Providers/UserProvider';


const Testtwo = () =>{
  return (
    <Box sx={{ display: { xs: 'none', md:'block' } , backgroundColor:'#9b4331'}}>
      <Ignlogo/>
    </Box>
  )
}


function App() {

  const isAuthenticated = false;
  
  const routeComponents = pages.map(({slug,component,useProtected},key) =>
   { 
   
      return useProtected ? 
      <ProtectedRoutes key={key} path={slug} exact element={component} isAuthenticated={isAuthenticated} /> : 
      <Route key={key} path={slug} exact element={component} /> 
    }
   );

  return (

    <div className="App">
     
      <RootComponent>
    
         <Router>
            <Navigation/>
            <Routes>
              <Route path='' element={<ProtectedRoutes isAuthenticated={false} />}>
                  <Route path='/dashboard' element={<Dashboard/>}/>
              </Route>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
            </Router> 
 
 
        </RootComponent>

      {/* <Navigation/> */} 
       
      {/* <Router>
            <Navigation/>
            <Routes>
              <Route path='' element={<ProtectedRoutes isAuthenticated={false} />}>
                  <Route path='/dashboard' element={<Dashboard/>}/>
              </Route>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
            </Router> */}
     
 

    </div>
  );
}

export default App;
