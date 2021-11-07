const Errors = (props)=>{
//   console.log("the error props")
//  console.dir(props)
  if( Object.entries(props.errors).length === 0 ){return ""}

  let output = [];
  

  for (let error in props.errors){
    // console.log("The error to display is ", props.errors[error])
    output.push(<li>{ props.errors[error]}</li>);
  }

  return( 
    <div>
     <ul className="errors">
       {output}
     </ul>
    </div>
   
    );
}

export default Errors;