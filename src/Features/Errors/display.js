const Errors = (props)=>{
//   ("the error props")
//  console.dir(props)
  if( Object.entries(props.errors).length === 0 ){return ""}

  let output = [];
  
  const uuid = (word)=>{
    let randomNumber = Math.floor(Math.random() * 1000) * Math.floor((Math.random() * 1000) * Date.now());
      let uuid = Math.floor(Math.random() * 1000) + word[Math.floor(Math.random() * word.length)] + randomNumber + word[Math.floor(Math.random() * word.length)]
      return uuid;
   }
  for (let error in props.errors){
    // ("The error to display is ", props.errors[error])
    output.push(<li key={ uuid("error") }>{ props.errors[error]}</li>);
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