import './App.css';
import { pages } from './routes/web';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import  Navigation  from './Features/Navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';
import Ignlogo from './components/Ignlogo';

import { BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import ComposeArticle from './pages/articles/ComposeArticle';
import EditArticle from './pages/articles/EditArticle';
import Login from './pages/authentication/Login';
import Logout from './pages/authentication/Logout';
import Register from './pages/authentication/register';

import RootComponent from './components/RootComponent';
import { useContext, useEffect } from 'react';
import { UserContext } from './Contexts/UserContext';
import { useUser } from './Providers/UserProvider';
import { useLocation } from 'react-router-dom';
import Home from './pages/home';
import FooterComponent from './components/Generic/FooterComponent';
import ErrorComponent from './components/Generic/ErrorComponent';
import ErrorProvider from './Providers/ErrorProvider';
import { ErrorContext } from './Contexts/ErrorContext';
import DetectChange from './components/Generic/DetectPageChangeComponent';




const MainApplication = ()=> {
  const {user,isLoggedin} = useContext(UserContext);
  const isAuthenticated = isLoggedin
  return (
    
   
    <>
      
         
  
    
         <Router>
            <DetectChange/>
            <Navigation Authenticated={isAuthenticated}/>
            <Routes>
            <Route path='/' element={<Home/>}/>
              <Route path='' element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                  <Route path='/dashboard' element={<Dashboard/>}/>
                  <Route path='/compose-article' element={<ComposeArticle/>}/>
                  <Route path='/edit-article/:article_id' element={<EditArticle/>}/>
              </Route>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
            </Router> 
 

        <FooterComponent/>


     
 
   
    </>
   
  );
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
      <ErrorProvider>
        <ErrorComponent/>
          <MainApplication/>
        </ErrorProvider>
      </RootComponent>


    </div>

  );
}

export default App;
