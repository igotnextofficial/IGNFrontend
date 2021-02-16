import React from 'react';

let Navigation = ()=>{
   let pages =[
      {
      name:'',
      slug:'',
      hasChildren:false,
      
    },
   {
      name:'',
      slug:'',
      hasChildren:false,
      
   },
   {
      name:'',
      slug:'',
      hasChildren:true,
      children:[{},{},{}]
   },
]

pages.map(page => {
   console.log(page)
})
   // <div>
   //    <p>Home</p>
   // </div>
}

export default Navigation;