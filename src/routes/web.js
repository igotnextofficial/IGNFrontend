import Home from '../pages/home';
import Login from '../pages/authentication/Login'
import Register from '../pages/authentication/register';
import FormTest from '../pages/FormTest';
import Dashboard from '../pages/dashboards/Dashboard';
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