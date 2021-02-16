 import formsData from './forms.json';

let inputTag = (options)=>{

   let {classnames,type,name,placeholder,dataSrc} = options;
   return <input className ={classnames} type={type} name ={name} placeholder ={placeholder} data-src={dataSrc} />

};

let selectTag = ()=>{
    return (
    <select>
      <option></option>
    </select>

    )
};

let EntryForm = ()=>{
    console.log(formsData)
    
    let output = formsData.map(item => {
        let element = []


        element.push( inputTag(item.options) );
        return element;
    })

    return (
        <div className="userForm">
            {output}

        </div>
    )
}

export  {EntryForm};