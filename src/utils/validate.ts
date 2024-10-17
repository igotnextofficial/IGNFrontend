const validator = require("validator");
 const removeSpaces = (value:string) => {return value.trim()}
 const belowMaximumLength = (value:string,maxLength:number) =>  { return value.length <= maxLength}
 const aboveMinimumLength = (value:string,minLength:number) => {return value.length >= minLength}
 const withinRange = (value:string,min:number,max:number) =>{ return  aboveMinimumLength(value,min) && belowMaximumLength(value,max) }

 const consistOfSpecialCharacters = (value:string) => {
    const dangerousSpecialCharacters = ['<', '>', '&', '"', "'", '/', '\\', ';', '#', '=', '`', '$', '%', '{', '}', '[', ']', '(', ')', '|', '^', '~', '*', '?', ':', '@', '+', '!'];
    let hasDangerousCharacter = false 
    dangerousSpecialCharacters.forEach(dangerousCharacter => {
        if(value.indexOf(dangerousCharacter) !== -1){
            hasDangerousCharacter = true
        }
    })
    return hasDangerousCharacter

}

 const onlyLetters = (value:string) => {
    let hasNumber = false
    value.split("").forEach(letter => {
      
        let isNum = parseInt(letter)
    
        if(!isNaN(isNum)){
            hasNumber = true
        }
    })
    return hasNumber === false ? true : false 
}

//  const strongPassword = () => { return true}
//  const validEmailAddress = () => {}
const validateCommonString = (value:string,min:number,max:number) => { 
  const cleanValue = removeSpaces(value)
  const validRange = withinRange(cleanValue,min,max);
  const validLettersOnly = onlyLetters(cleanValue)
  const validNoSpecialChars = !consistOfSpecialCharacters(cleanValue) 

  if(
    validRange && 
    validLettersOnly &&
    validNoSpecialChars
  ){
    return true
  }

  return false;

}

 export const validateUsername = (value:string) => {
   return validateCommonString(value,3,25)
}

 export const validateFullname = (value:string) => {
    return validateCommonString(value,2,30)
}

 export const validateEmail = (email:string) => {


    /**
     *  ======================= VALIDATE EMAIL =======================
     * Find a better to validate email domain.
     *    const validEmailDomains = ["gmail.com","aol.com","yahoo.com","hotmail.com"]
             if(validEmailDomains.includes(emailDomain)){
             valid = true
         }  

     * 
     */
    let valid = false
    if(validator.isEmail(email)){

        let start = email.indexOf("@")
        let emailDomain = email.substring(start + 1)
        console.log(`email check ${email} email domain is ${emailDomain}`)
        valid = true
    }
    
    console.log(`is the email valid ${valid}`)
    return valid
}

export const validateChoices = (choices:string[],choice:string) => {
    let lowercasedChoices = choices.map(currentChoice => currentChoice.toLocaleLowerCase())
    return lowercasedChoices.includes(choice.toLowerCase())
}

export const validatePassword = (value:string) => {
    return true
}


// module.exports={validateChoices,validateEmail,validateFullname,validateUsername,belowMaximumLength,aboveMinimumLength, onlyLetters, consistOfSpecialCharacters}


