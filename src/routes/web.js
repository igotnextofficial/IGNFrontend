import Home from '../pages/home';
import Login from '../pages/authentication/login';
import Register from '../pages/authentication/register';
import FormTest from '../pages/FormTest';
import Dashboard from '../pages/dashboards/Dashboard';




export const pages = [
    {
       title:'', 
      slug:'/home',
       component:Home
        
      },
     
   {
    
      slug:'/login',
     component:Login
      
   },
   {
    
    slug:'/register',
   component:Register
    
 },
 {   
    slug:'/test',
    component:FormTest
  
},

{   
    slug:'/dashboard',
    component:Dashboard
  
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