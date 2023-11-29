import './App.css';
import { pages } from './Routes/web';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import  Navigation  from './Features/Navigation/Navigation';
import ProtectedRoutes from './Utils/ProtectedRoute';
import Ignlogo from './Components/Ignlogo';

import { BrowserRouter as Router, Switch, Route, Routes, Link} from 'react-router-dom';
import Dashboard from './Pages/Dashboards/Dashboard';
import ComposeArticle from './Pages/Articles/ComposeArticle';
import EditArticle from './Pages/Articles/EditArticle';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';

import RootComponent from './Components/Generic/RootComponent';
import { useContext, useEffect } from 'react';
import { UserContext } from './Contexts/UserContext';
import { useUser } from './Providers/UserProvider';
import { useLocation } from 'react-router-dom';
import Home from './Pages/home';
import FooterComponent from './Components/Generic/FooterComponent';
import ErrorComponent from './Components/Generic/ErrorComponent';
import ErrorProvider from './Providers/ErrorProvider';
import { ErrorContext } from './Contexts/ErrorContext';
import DetectChange from './Components/Generic/DetectPageChangeComponent';
import WhosNextPage from './Pages/Articles/WhosNext';
import EntertainmentNewsPage from './Pages/Articles/EntertainmentNews';
import ArtistOfThelMonthPage from './Pages/Articles/ArtistOfTheMonth';
import FeaturedArtistPage from './Pages/Articles/FeaturedArtist';
import ArticlePageComponent from './Components/Article/ArticlePageComponent';




const MainApplication = ()=> {
  const {isLoggedin} = useContext(UserContext);
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
              <Route path='/Whos-Next' element={<WhosNextPage/>}/>
              <Route path='/featured-artists' element={<FeaturedArtistPage/>}/>
              <Route path='/entertainment-news' element={<EntertainmentNewsPage/>}/>
              <Route path='/artist-of-the-month' element={<ArtistOfThelMonthPage/>}/>
              <Route path='/:category/:article_id' element={<ArticlePageComponent/>}/>

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
        
         
   
        <ErrorComponent/>
          <MainApplication/>
     


    </div>

  );
}

export default App;
