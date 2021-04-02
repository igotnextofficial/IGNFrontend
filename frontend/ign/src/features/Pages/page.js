import Home from './Home';
import About from './About';
import createPage from './CreatePage';
import FormDisplay from './FormDisplay';

export const pages = [
    {
       title:'', 
      slug:'/home',
       component:Home
        
      },
     {
    
        slug:'/about',
       component:About
        
     },
     {
    
        slug:'/create-page',
       component:createPage
        
     },

     {
    
      slug:'/forms',
     component:FormDisplay
      
   },
]

