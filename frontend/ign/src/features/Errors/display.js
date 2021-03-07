const Errors = (props)=>{
  console.dir(props)
  if( props.errors.length === 0 ){return ""}

  let output = [];

  props.errors.map((error,index)=>{
    console.log(error)
    // console.dir(props.errors[1].new)
     output.push(<li key={index}>{error}</li>);
     return true;
 })

  return( 
    <div>

     <h1>you have errors</h1>
     <ul>
       {output}
     </ul>
    </div>
    );
}

export default Errors;