import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Item } from '@mui/material';


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

   {
      name:'forms',
      slug:'/forms',
      hasChildren:false,
    
      
   },

  ]

  const myPages = pages.map(page =>{
   //   let link = <Grid item xs={3}> <li className='nav-item'> <Link className='nav-link' key={ page.name } to={page.slug}>{page.name} </Link></li> </Grid>;
   //    links.push(link);
      return (<li className='nav-links'> <Link className='nav-link' key={ page.name } to={page.slug}>{page.name} </Link></li> );
   })
   
   return(
      <nav>
         <h3>I got Next Magazine</h3>
         {myPages}
         
        <div>Search</div>
         </nav>
   //   <nav className="navbar navbar-expand-lg bg-body-tertiary">
   //     <h3>I got Next Magazine </h3>
   //     <ul  className="nav-links">{links}</ul>
   //    </nav>
   )

}


export default Navigation;
