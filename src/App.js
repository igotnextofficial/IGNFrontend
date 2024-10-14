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

import ArticleCategoryList from './Pages/Articles/ArticleCategoryList';
import ArticlePageComponent from './Components/Article/ArticlePageComponent';
import FindMentorPage from './Pages/Mentors/FindMentorPage';
import BookMentorPage from './Pages/Mentors/BookMentorPage';
import EditProfile from './Pages/EditProfile';
import MessageReaderReply from './Pages/Notes/MessageReaderReply';

import ScheduleSession from './Pages/Artists/ScheduleSession';


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
