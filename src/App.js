import './App.css';
import { pages } from './routes/web';
import  Navigation  from './features/Navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';

import { BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import Login from './pages/authentication/Login';




function App() {
    const isAuthenticated = true;
   const routeComponents = pages.map(({slug,component,useProtected},key) =>
   { 
    return <Route key={key} path={slug} exact element={component} /> 
      return useProtected ? 
      <ProtectedRoutes key={key} path={slug} exact component={component} isAuthenticated={isAuthenticated} /> : 
      <Route key={key} path={slug} exact component={component} /> 
    }
   );
  return (
   
    <div className="App">
       
      <Router>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
        {/* {routeComponents} */}
        </Routes>
      </Router>
      {/* <Navigation/> */} 

     
 

    </div>
  );
}

export default App;
