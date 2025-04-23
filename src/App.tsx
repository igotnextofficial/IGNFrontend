import React from 'react';
import './App.css';

import { useEffect, useState } from 'react';
import Navigation from './features/navigation/Navigation';
import ProtectedRoutes from './utils/ProtectedRoute';
import FooterComponent from './components/generic/FooterComponent';

import { BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboards/Dashboard';
import ComposeArticle from './pages/articles/ComposeArticle';
import EditArticle from './pages/articles/EditArticle';
import Login from './pages/authentication/Login';
import Logout from './pages/authentication/Logout';
import Register from './pages/authentication/Register';
import RegisterMentor from './pages/authentication/RegisterMentor';
import ScheduleAvailability from './pages/mentors/ScheduleAvailability';
import About from './pages/About';

import { useUser } from './contexts/UserContext';

import Home from './pages/home';
import ErrorComponent from './components/generic/ErrorComponent';

import DetectChange from './components/generic/DetectPageChangeComponent';

import ArticleCategoryList from './pages/articles/ArticleCategoryList';
import ArticlePageComponent from './components/article/ArticlePageComponent';
import FindMentorPage from './pages/mentors/FindMentorPage';
import BookMentorPage from './pages/mentors/BookMentorPage';
import EditProfile from './pages/EditProfile';
import MessageReaderReply from './pages/notes/MessageReaderReply';

import ScheduleSession from './pages/artists/ScheduleSession';
import { useErrorHandler } from './contexts/ErrorContext';
import UserProfile from './pages/UserProfile';
import CloseSession from './pages/mentors/CloseSession';
import HealthCheck from './pages/healthcheck';
import { Roles } from './types/Roles';
import FeatureSubmission from './pages/FeatureSubmission';
import Mentors from './pages/mentors/Mentors';

const MainApplication: React.FC = () => {
  const { isLoggedin, user } = useUser();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(isLoggedin);
    setCurrentUser(user);
  }, [user, isLoggedin]);

  /* 
  ================== Socket Connection ================== 

   - Not currently used  but will circle back after MVP is completed.
   and will be used to send notifications to users.

       --- Neccessary imports: ---
       import { socket } from './socket'
       import { useEffect,useState } from 'react';
  
   */

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Router future={{ v7_startTransition: true }}>
        <DetectChange />
        <Navigation Authenticated={isAuthenticated} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/profile/:role/:user_id' element={<UserProfile />} />
            <Route path='/health-check' element={<HealthCheck />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/register' element={<Register />} />
            <Route path="/schedule-availability" element={<ScheduleAvailability />} />

            <Route path='/articles/:category' element={<ArticleCategoryList />} />
            <Route path='articles/:category/:article_id' element={<ArticlePageComponent />} />

            <Route path='/profile/:role' element={<Dashboard />} />
            <Route path='/mentors' element={<Mentors />} />

            {/* Routes that require authentication */}
            <Route element={<ProtectedRoutes redirectPath='/' isAuthenticated={isAuthenticated} />}>
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/dashboard/:role' element={<Dashboard />} />
              <Route path='/notes/:note_id' element={<MessageReaderReply />} />

              <Route path='mentors/find-a-mentor' element={<FindMentorPage />} />
              <Route path='/mentors/book-a-mentor/:mentorId' element={<BookMentorPage />} />
              <Route path='/schedule' element={<ScheduleSession />} />

              <Route path='/session/:mentee_id/closeout/:session_id' element={<CloseSession />} />

              <Route path='/compose-article' element={<ComposeArticle />} />
              <Route path='/edit-article/:article_id' element={<EditArticle />} />
            </Route>

            {/* Routes that require admin role */}
            <Route element={<ProtectedRoutes redirectPath='/' isAuthenticated={isAuthenticated} grantedAccess={[Roles.ADMIN]} />}>
              <Route path='/register-mentor' element={<RegisterMentor />} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
            </Route>

  

            <Route path='/want-to-be-featured' element={<FeatureSubmission />} />
          </Routes>
        </main>
      </Router>
      <FooterComponent />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorComponent />
      <MainApplication />
    </div>
  );
};

export default App;
