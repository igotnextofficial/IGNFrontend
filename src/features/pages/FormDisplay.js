


import FormCreation from '../forms/FormCreation';
let forms = {
    tag:"input",
    options :{
        type:"text",
        placeholder:"enter first name",
        name:"first_name",
        id:"firstName",
        className:"hello world",
    
    }
}
const FormDisplay = ()=>{




    return (
        <div>
        
          <h1>Form</h1>
          <FormCreation options={forms.options}/>
        </div>
    );
}


export default FormDisplay;