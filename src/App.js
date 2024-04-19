import './App.css';


import Navigation from './Features/Navigation/Navigation';
import ProtectedRoutes from './Utils/ProtectedRoute';


import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Dashboard from './Pages/Dashboards/Dashboard';
import ComposeArticle from './Pages/Articles/ComposeArticle';
import EditArticle from './Pages/Articles/EditArticle';
import Login from './Pages/Authentication/Login';
import Register from './Pages/Authentication/Register';


import { useUser } from './Contexts/UserContext';

import Home from './Pages/home';
import FooterComponent from './Components/Generic/FooterComponent';
import ErrorComponent from './Components/Generic/ErrorComponent';

import DetectChange from './Components/Generic/DetectPageChangeComponent';
import WhosNextPage from './Pages/Articles/WhosNext';
import EntertainmentNewsPage from './Pages/Articles/EntertainmentNews';
import ArtistOfThelMonthPage from './Pages/Articles/ArtistOfTheMonth';
import FeaturedArtistPage from './Pages/Articles/FeaturedArtist';
import ArticlePageComponent from './Components/Article/ArticlePageComponent';
import FindMentorPage from './Pages/Mentors/FindMentorPage';
import BookMentorPage from './Pages/Mentors/BookMentorPage';
import EditProfile from './Pages/EditProfile';
import MessageReaderReply from './Pages/Notes/MessageReaderReply';

import ScheduleSession from './Pages/Artists/ScheduleSession';




const MainApplication = () => {
  const { isLoggedin } = useUser();
  const isAuthenticated = isLoggedin
  return (


    <>



      <Router>
        <DetectChange />
        <Navigation Authenticated={isAuthenticated} />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Articles */}
          <Route path='/whos-next' element={<WhosNextPage />} />
          <Route path='/artist-of-the-month' element={<ArtistOfThelMonthPage />} />
          <Route path='/featured-artists' element={<FeaturedArtistPage />} />
          <Route path='/entertainment-news' element={<EntertainmentNewsPage />} />
          <Route path='article/:category/:article_id' element={<ArticlePageComponent />} />
          
          <Route path='/profile/:role' element={< Dashboard />} />

          {/* Profile */}
          <Route path='/schedule' element={<ScheduleSession />} /> 
          
          <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
            <Route path='/edit-profile' element={<EditProfile />} /> {/* Sends Request */}
            <Route path='/dashboard/:role' element={<Dashboard />} /> 
     
            
            <Route path='mentors/find-a-mentor' element={<FindMentorPage />} />
            <Route path='/mentors/book-a-mentor/:mentorId' element={<BookMentorPage />} /> {/* Sends Request */}
          
            <Route path='/notes/:note_id' element={<MessageReaderReply />} /> 
            
            <Route path='/compose-article' element={<ComposeArticle />} />  {/* Sends Request */}
            <Route path='/edit-article/:article_id' element={<EditArticle />} />{/* Sends Request */}
          </Route>


         
        </Routes>
      </Router>



      <FooterComponent />





    </>

  );
}

function App() {



  // const isAuthenticated = false;

  // const routeComponents = pages.map(({ slug, component, useProtected }, key) => {



  //   return useProtected ?
  //     <ProtectedRoutes key={key} path={slug} exact element={component} isAuthenticated={isAuthenticated} /> :
  //     <Route key={key} path={slug} exact element={component} />
  // }
  // );

  return (

    <div className="App">



      <ErrorComponent />
      <MainApplication />



    </div>

  );
}

export default App;
