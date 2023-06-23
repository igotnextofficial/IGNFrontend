import './App.css';
import { pages } from './routes/web';
import  Navigation  from './features/Navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';




function App() {
    const isAuthenticated = true;
   const routeComponents = pages.map(({slug,component,useProtected},key) =>
   { 
      return useProtected ? 
      <ProtectedRoutes key={key} path={slug} exact component={component} isAuthenticated={isAuthenticated} /> : 
      <Route key={key} path={slug} exact component={component} /> 
    }
   );
  return (
   
    <div className="App">
       
      <Router>
      {/* <Navigation/> */} 
      <Switch>
         {routeComponents}
      </Switch>
    </Router>
    </div>
  );
}

export default App;
