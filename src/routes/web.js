import Home from '../pages/home';
import Login from '../pages/authentication/Login'
import Register from '../pages/authentication/Register';
import FormTest from '../pages/FormTest';
import Dashboard from '../pages/dashboards/Dashboard';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import CommunityGuidelines from '../pages/CommunityGuidelines';
import BecomeAMentor from '../pages/BecomeAMentor';
import NewsPress from '../pages/NewsPress';
import AdvertiseWithUs from '../pages/AdvertiseWithUs';
import FAQs from '../pages/FAQs';
import MentorDirectory from '../pages/MentorDirectory';
import MenteeDirectory from '../pages/MenteeDirectory';
import { Logout } from '@mui/icons-material';




export const pages = [
    {
       title:'', 
      slug:'/home',
       component:Home,
       useProtected: false
        
      },
     
   {
    
      slug:'/login',
     component:Login,
     useProtected: false
      
   },
   {
   slug:'/logout',
   component:Logout,
   useProtected: true
    
 },
   {
    
    slug:'/register',
   component:Register,
   useProtected: false
    
 },
 {   
    slug:'/test',
    component:FormTest,
    useProtected: false
  
},

{   
    slug:'/dashboard',
    component:Dashboard,
    useProtected: true
  
},
{   
    slug:'/terms-of-service',
    component:TermsOfService,
    useProtected: false
  
},
{   
    slug:'/privacy-policy',
    component:PrivacyPolicy,
    useProtected: false
  
},
{   
    slug:'/community-guidelines',
    component:CommunityGuidelines,
    useProtected: false
  
},
{   
    slug:'/become-a-mentor',
    component:BecomeAMentor,
    useProtected: false
  
},
{   
    slug:'/news-press',
    component:NewsPress,
    useProtected: false
  
},
{   
    slug:'/advertise',
    component:AdvertiseWithUs,
    useProtected: false
  
},
{   
    slug:'/faqs',
    component:FAQs,
    useProtected: false
  
},
{   
    slug:'/directory/mentor',
    component:MentorDirectory,
    useProtected: false
  
},
{   
    slug:'/directory/mentee',
    component:MenteeDirectory,
    useProtected: false
  
},
   
]

// title:'', 
// slug:'/home',
//  component:Home
  
// },
// {

//   slug:'/about',
//  component:About
  
// },
// {

//   slug:'/create-page',
//  component:createPage
  
// },

// {

// slug:'/forms',
// component:FormDisplay

// }