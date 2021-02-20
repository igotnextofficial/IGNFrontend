import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ()=>{
   let links = [];
   let pages =[
      {
      name:'Home',
      slug:'/home',
      hasChildren:false,
      
      
    },
   {
      name:'About',
      slug:'/about',
      hasChildren:false,

      
   },

   {
      name:'create page',
      slug:'/create-page',
      hasChildren:false,
    
      
   },

  ]
  pages.map(page =>{
      let link = <Link to={page.slug}><li>{page.name} </li></Link>;
      links.push(link);
   })
   
   return(
     <nav>
       <h3>I got Next Magazine</h3>
       <ul className="nav-links">{links}</ul>
      </nav>
   )

}


export default Navigation;
