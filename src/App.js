import './App.css';


import Navigation from './features/navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';


import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import ComposeArticle from './pages/articles/ComposeArticle';
import EditArticle from './pages/articles/EditArticle';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';


import { useUser } from './contexts/UserContext';

import Home from './pages/home';
import FooterComponent from './components/generic/FooterComponent';
import ErrorComponent from './components/generic/ErrorComponent';

import DetectChange from './components/generic/DetectPageChangeComponent';

import ArticleCategoryList from './pages/articles/ArticleCategoryList';
import ArticlePageComponent from './components/article/ArticlePageComponent';
import FindMentorPage from './pages/mentors/FindMentorPage';
import BookMentorPage from './pages/mentors/BookMentorPage';
import EditProfile from './pages/EditProfile';
import MessageReaderReply from './pages/notes/MessageReaderReply';

import ScheduleSession from './pages/artists/ScheduleSession';


// import LocalStorage from './Storage/LocalStorage'; // not curretly used.




const MainApplication = () => {
  const { isLoggedin } = useUser();

  const isAuthenticated = isLoggedin

  /* 
  ================== Socket Connection ================== 

   - Not currently used but will circle back after MVP is completed.
   and will be used to send notifications to users.

       --- Neccessary imports: ---
       import { socket } from './socket'
       import { useEffect,useState } from 'react';
  
   */
  

  // const [isConnected,setIsConnected] = useState(socket.connected)

 
  // useEffect(() => {
  //   function onConnect(){
  //     setIsConnected(true)
  //   }
    
  //   function onDisconnect(){
  //     setIsConnected(false)
  //   }

  //   // if(isAuthenticated && !isConnected){
  //   //   socket.connect()
  //   // }
  //   // if(isAuthenticated && isConnected){
  //   //   socket.emit('authenticate', { isAuthenticated, token: localStorage.getItem('token') , message:"hello from client"})
  //   // }


  //   // socket.on('connect',  onConnect)

  //   // socket.on('disconnect',  onDisconnect)

  //   // return () => {
  //   //   socket.off('connect',onConnect)
  //   //   socket.off('disconnect',onDisconnect)
  //   // }
  
  // },[isAuthenticated,isConnected])


//  ================== End Socket Connection ================== 

  
 

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
          <Route path='/articles/:category' element={<ArticleCategoryList />} />
     
          <Route path='articles/:category/:article_id' element={<ArticlePageComponent />} />
          
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
