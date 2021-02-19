import React from 'react';
import Home from '../Pages/Home.js';
import About from '../Pages/About';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
export const Navigation = ()=>{
   let pages =[
      {
      name:'Home',
      slug:'/home',
      hasChildren:false,
      pageComponent:Home
      
    },
   {
      name:'About',
      slug:'/about',
      hasChildren:false,
      pageComponent:About
      
   },

]

let links = [];
let pageRoutes = [];


   pages.map(page =>{

   //   let pageRoute = page.slug !== '/' ? <Route path={page.slug}  component={page.pageComponent} /> : <Route path={page.slug} exact  component={page.pageComponent} />
     let link = <Link to={page.slug}><li>{page.name} </li></Link>;
      // pageRoutes.push(pageRoute);
      links.push(link);
   })
   


return(

<Router>
  <Switch>
     <ul>{links}</ul>
     <Route path='/home' component={Home} />
     <Route path='/about' component={About} />
  </Switch>
</Router>

)
   // <div>
   //    <p>Home</p>
   // </div>
}

