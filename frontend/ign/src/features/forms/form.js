class FormCreation{

    constructor(){
       
        this.validTagNames = ['input','select','option','textarea'];
        this.attributes = {};
        this.classnames = [];
        this.id = "";
        this.formElement = {}

    }
    //tagname
    //validTagnames
    //attributes
    //classnames
    // id 

    //createlement

    init(element){ //object passed from  user to set properties of elements.
       let elementCreated = this.createElement(element.type)
       if(elementCreated !== false) {addElementOptions(element)};

    }
    
    createElement(elementName){
      if( !this.validTagNames.find(elementName.toLowerCase()) ){ return false;}
      let element = document.createElement(elementName);
      this.setFormElement = element
    }
    
    addElementOptions(element){
      this.updateClassNames(element.classnames);
      this.updateElementAttritbutes(element.attributes);
      this.setIdName(element.id)
    }

    updateElementAttritbutes(attributes){
      if (Object.keys(attributes).length < 1){return false;}
      this.setAttritbutes = attributes;
    }

    updateClassNames(classnames){
        if(classnames.length < 1){return;}
        let classesToAdd = this.classnames.concat(classnames);
        classesToAdd.classnames.map((cname)=>{
            this.getFormElement.classList.add(cname);
        })
    }

    setIdName(id){
        this.setId = id;
    }
    //getters
    get getFormElement(){
        return this.formElement;
    } 

    get getId(){
        return this.id;
    }

    //setters

    set setFormElement(element){
      this.formElement = element;
    }

    set setAttritbutes(attributes){
        this.attributes = attributes
    }

    set setClassnames(classnames){
        this.classnames = classnames
    }

    set setId(id){
        this.id = id;
    }


}