

// const path = require('path')
// const validate  = require(path.resolve('src/Utils/validate'))
// const chai = require('chai')

// const expected = chai.expect
// describe('Array', () => {
//     describe('Validation for registration form',() => {
//         it("should return true on valid email address and false on invalid",()=>{
//             let validEmail = "john123@gmail.com";
//             expected(validate.validateEmail(validEmail)).to.equal(true)
//         })

//         it("should return false when email is invalild", ()=>{
//             let invalidEmail = "john123@@gmail.com";
//             expected(validate.validateEmail(invalidEmail)).to.equal(false)
//         })

//         it("should return false if email is not legit", () => {
//             let invalidEmail = "john123@joegmail.com";
//             expected(validate.validateEmail(invalidEmail)).to.equal(false)
//         })

//         it("string  should only letters", () => {
//             let letters = "joey"
//             expected(validate.onlyLetters(letters)).to.equal(true)
//         })

//         it("string is above minimvalue should be true", () => {
//             let longvalue = "thisisareallyreallylonguserfullnamethatismorethanthirtycharacters"
//             expected(validate.aboveMinimumLength(longvalue,3)).to.equal(true)
//         })

//         it("string is below max value should be true", () => {
//             let value = "this"
//             expected(validate.belowMaximumLength(value,10)).to.equal(true)
//         })

//         it("should return true if the currentvalue has a special character", ()=> {
//             let value = "joseph!"
//             expected(validate.consistOfSpecialCharacters(value)).to.equal(true)
//         })


//         it("validate the fullname of the user , it should be between 2 and 30 characters should be false on only spaces", () => {
//             let justSpaces = "                  "
//             expected(validate.validateEmail(justSpaces)).to.equal(false)
//         })

//         it("validate the fullname should be false <= 2", () => {
//             let justSpaces = "a"
//             expected(validate.validateEmail(justSpaces)).to.equal(false)
//         })

//         it("validate the fullname should be false >= 30", () => {
//             let longname = "thisisareallyreallylonguserfullnamethatismorethanthirtycharacters"
//             expected(validate.validateEmail(longname)).to.equal(false)
//         })

//         it("validate the fullname this is a valid fullname", () => {
//             let validfullname = "joseph"
//             expected(validate.validateFullname(validfullname)).to.equal(true)
//         })

//         it("validate the fullname this is invalid fullname should be false", () => {
//             let validfullname = "joseph!"
//             expected(validate.validateFullname(validfullname)).to.equal(false)
//         })

//         it("should validate whether a correct choice has been chosen", () => {
//             let roles = ["admin","artist"]
      

//             expected(validate.validateChoices(roles,"artist")).to.equal(true)
//         })

        
//         it("should validate whether a correct choice has been chosen return false if it is not", () => {
//             let roles = ["admin","artist"]
      

//             expected(validate.validateChoices(roles,"writer")).to.equal(false)
//         })
//         it("ignore case of choices in list", () => {
//             let roles = ["admin","artist","WRITER"]
      

//             expected(validate.validateChoices(roles,"writer")).to.equal(true)
//         })

//         it("should validate the username return should be true on valid username", () => {
//             expected(validate.validateUsername("joseph")).to.equal(true)
//         })


 
//     })
// })