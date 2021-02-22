import { Request } from './Request';
import { expect } from 'chai';

describe("Requests object basic functionality", ()=>{
  describe("setDestination method Funtionality",()=>{

      it("returns false when passed an invalid url", ()=>{
         const expected = false;
         const actual = Request.validUrl('www.trying.test.com/testing');
         expect(actual).to.deep.equal(expected);
      })

      it("return false if users passes no url", ()=>{
        const expected = false;
        const actual = Request.paramIsNotPassed();
        expect(actual).to.deep.equal(expected);
     })

     it("Adds correct error message if url is not valid.", ()=>{
        let url ='www.trying.test.com/testing';
        const expected = `The url you entered ${url} is invalid`;
        const actual = Request.addError('invalidUrl',expected);
        expect(actual).to.deep.equal(expected);
     })

     it("returns false when passed an invalid url", ()=>{
        const expected = false;
        const actual = Request.setDestination();
        expect(actual).to.deep.equal(expected);
     })
      
  })

})