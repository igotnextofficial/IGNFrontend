const FormCreation = (props) => {
    let validTypes = ["input","textarea","select","option","checkbox"];

    
    const InputField = () =>{
        let output = []
        return output.concat( <div><input { ...props.options }   /></div>)
    }

    const TextareaField = () =>{}

    const OptionField = () =>{}

    let tags = {"input":<InputField/>}

    return <InputField />
}




export default FormCreation;