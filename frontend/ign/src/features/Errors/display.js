const Errors = (props)=>{
 
  if( Object.entries(props.errors).length === 0 ){return ""}

  let output = [];
  

  for (let error in props.errors){
    output.push(<li>{ props.errors[error]}</li>);
  }

  return( 
    <div>

     <p className="errorHeader">Please Fix the following errors: </p>
     <ul className="errors">
       {output}
     </ul>
    </div>
   
    );
}

export default Errors;