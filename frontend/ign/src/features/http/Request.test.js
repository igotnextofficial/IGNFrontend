import { Request } from './Request';
import { expect } from 'chai';

describe("Requests object basic functionality", ()=>{
  describe("setDestination method Funtionality",()=>{

      it("returns false when passed an invalid url", ()=>{
        let REQUEST = new Request();
         const expected = false;
         const actual = REQUEST.validUrl('www.tryingtest.comuu878');
         expect(actual).to.deep.equal(expected);
      })

      it("return false if users passes no url", ()=>{
        let REQUEST = new Request();
        const expected = false;
        const actual = REQUEST.paramIsNotPassed();
        expect(actual).to.deep.equal(expected);
     })

     it("return correct error message when key is provided.", ()=>{
         let url ='www.trying.test.com/testing';
        let REQUEST = new Request();
        REQUEST.addError('invalidUrl',`The url you entered ${url} is invalid`);

        const expected = `The url you entered ${url} is invalid`;
        const actual = REQUEST.getErrorMessage('invalidUrl');
        expect(actual).to.deep.equal(expected);
     })



     it("setDestination method returns false if url is not valid", ()=>{
        let REQUEST = new Request();
        REQUEST.setDestination("htt//www.hubspot.com.test.t");
        let url = "htt//www.hubspot.com.test.t";
        
        const expected = false;
        const actual = REQUEST.setDestination("htt//www.hubspot.com.test.t");
         
        expect(actual).to.deep.equal(expected);
     })


     it("returns the destination of a set object", ()=>{
        let url = "https//www.hubspot.com";
        let REQUEST = new Request();
        REQUEST.destination = url;
        const expected = url;
        const actual =  REQUEST.getDestination();
        expect(actual).to.deep.equal(expected);
     })
      
  })

})