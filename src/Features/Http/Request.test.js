import IgnRequest  from './Request';
import { expect } from 'chai';


// Testing for set destination //
describe("Requests object basic functionality", ()=>{
  describe("setDestination method Funtionality",()=>{

      it("returns false when passed an invalid url", ()=>{
        let REQUEST = new IgnRequest();
         const expected = false;
         const actual = REQUEST.validUrl('www.tryingtest.comuu878');
         expect(actual).to.deep.equal(expected);
      })

      it("return false if users passes no url", ()=>{
        let REQUEST = new IgnRequest();
        const expected = false;
        const actual = REQUEST.paramIsNotPassed();
        expect(actual).to.deep.equal(expected);
     })

     it("return correct error message when key is provided.", ()=>{
         let url ='www.trying.test.com/testing';
        let REQUEST = new IgnRequest();
        REQUEST.addError('invalidUrl',`The url you entered ${url} is invalid`);

        const expected = `The url you entered ${url} is invalid`;
        const actual = REQUEST.getErrorMessage('invalidUrl');
        expect(actual).to.deep.equal(expected);
     })



     it("setDestination method returns false if url is not valid", ()=>{
        let url = "htt//www.hubspot.com.test.t";
        let REQUEST = new IgnRequest();
        REQUEST.setDestination(url);
   
        
        const expected = false;
        const actual = REQUEST.setDestination(url);
         
        expect(actual).to.deep.equal(expected);
     })


     it("returns the destination of a set object", ()=>{
        let url = "https//www.hubspot.com";
        let REQUEST = new IgnRequest();
        REQUEST.destination = url;
        const expected = url;
        const actual =  REQUEST.getDestination;
        expect(actual).to.deep.equal(expected);
     })


     describe("Testing method used within set destination",()=>{
         it("Set Destination returns false if nothing is passed as a parameter", () =>{
            const expected =  false;
            const REQUEST = new IgnRequest();
            const actual = REQUEST.setDestination()
            expect(actual).to.deep.equal(expected)
         })

       

    

     })

     describe("if the url is valid the set destination function should set destination", ()=>{

        it("Sets the destination if it is valid", () =>{
            let url = "https://www.google.com";
            const expected =  url;
            const REQUESTs = new IgnRequest();
            REQUESTs.setDestination(url)
            const actual = REQUESTs.getDestination
            expect(actual).to.deep.equal(expected)
         })
     })
      
  })

  describe("Testing functionality for setMethod Function",() => {
      it("updated the method property with the giving method",()=>{
          let method  = "POST";
          const expected = method;
          const REQUESTs = new IgnRequest();
          REQUESTs.setMethod(method);
          const actual = REQUESTs.getMethod;
          expect(actual).to.deep.equal(expected);
      })

      it("Provides the get method if invalid method is passed.",()=>{
        let method  = "POSTst";
        const expected = "GET";
        const REQUESTs = new IgnRequest();
        REQUESTs.setMethod(method);
        const actual = REQUESTs.getMethod;
        expect(actual).to.deep.equal(expected);
      })
    })

    describe("testing setData basic functionality",() => {
        it("If the method is not Post the data should return an empty object",()=>{
            const data = {name:'John',age:18};
            const expected = {};
            const REQUESTs = new IgnRequest();
            REQUESTs.setData(data);
            const actual = REQUESTs.getData;
            expect(actual).to.deep.equal(expected);
        })
  
        it("if the data object is sent with information and method is post then updata data object",()=>{
          const data = {name:'John',age:18};
          let method  = "POST";
          const expected = data;
          const REQUESTs = new IgnRequest();
          REQUESTs.setMethod(method);
          REQUESTs.setMethod(method);
          REQUESTs.setData(data);

          const actual = REQUESTs.getData;
          expect(actual).to.deep.equal(expected);
        })
      })


      describe("testing setHeader basic functionality",() => {
        it("If nothing is passed the method should return an empty object",()=>{
            const data = {};
            const expected = {};
            const REQUESTs = new IgnRequest();
            REQUESTs.setHeader(data);
            const actual = REQUESTs.getHeader;
            expect(actual).to.deep.equal(expected);
        })
  
        it("The method should return an object of headers sent by user",()=>{
          const data = {token:"783sd3fff449jskslkdld"};
          const expected = data;
          const REQUESTs = new IgnRequest();
          REQUESTs.setHeader(data);
          const actual = REQUESTs.getHeader;
          expect(actual).to.deep.equal(expected);
        })
      })


      describe("testing set payload functionality",() => {
        it("The Payload return an object of all the configuration data which is passed to the init function.",()=>{
            const configuration = {
                url:'http://pages.igotnext.test/api/',
                method:'POST',
                data:{title:'whos got next',slug:'whos-got-next',content:'this is the content.',display:false},
                headers:{token:'fb7b888cbbbb7883393ffzvks'}
            };
            const expected = configuration;
            const REQUESTs = new IgnRequest();
            REQUESTs.init(configuration);
            const actual = REQUESTs.getPayload;
            expect(actual).to.deep.equal(expected);
        })

        it("If the method is  GET request the data object should not be set",()=>{
            const configuration = {
                url:'http://pages.igotnext.test/api/',
                method:'GET',
                data:{title:'whos got next',slug:'whos-got-next',content:'this is the content.',display:false},
                headers:{token:'fb7b888cbbbb7883393ffzvks'}
            };
            const expected = {
                url:'http://pages.igotnext.test/api/',
                method:'GET',
                headers:{token:'fb7b888cbbbb7883393ffzvks'}
            };
            const REQUESTs = new IgnRequest();
            REQUESTs.init(configuration);
            const actual = REQUESTs.getPayload;
            expect(actual).to.deep.equal(expected);
        })


        it("If the headers config is not set skip over and do not add it to payload.",()=>{
            const configuration = {
                url:'http://pages.igotnext.test/api/',
                method:'GET',
                data:{title:'whos got next',slug:'whos-got-next',content:'this is the content.',display:false},
         
            };
            const expected = {
                url:'http://pages.igotnext.test/api/',
                method:'GET',
            };
            const REQUESTs = new IgnRequest();
            REQUESTs.init(configuration);
            const actual = REQUESTs.getPayload;
            expect(actual).to.deep.equal(expected);
        })

      })


 

})

// End for set destination //