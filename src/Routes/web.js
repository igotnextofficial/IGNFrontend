import Home from '../Pages/home';
import Login from '../Pages/Authentication/Login'
import Register from '../Pages/Authentication/Register';
import FormTest from '../Pages/FormTest';
import Dashboard from '../Pages/Dashboards/Dashboard';
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