import './App.css';
import { pages } from './routes/web';
import  Navigation  from './features/Navigation/Navigation';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';




function App() {
 
   const routeComponents = pages.map(({slug,component},key) => <Route key={key} path={slug} exact component={component}/>)
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
