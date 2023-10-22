import { ArticleDataType, UserDataType, httpDataObject } from "../../types/DataTypes";
import IgnRequest from "../../features/Http/IgnRequest";

class Article{
    endpoint: string
    baseURI: string
    ignHttpRequest: IgnRequest;

    static readonly defaultResponse:ArticleDataType = {
        title:"",
        image_url:"",
        content:"",
        author:"",
        published:"",
        drafts:[]
    };

    static readonly TITLE = "title";
    static readonly CONTENT = "content";
    static readonly STORAGE_ACCESS_KEY: string = "articles";
    static readonly ACCESS_TOKEN: string = "accessToken";

    static readonly RANGE_LIMITS = {
        TITLE:{MIN: 5,MAX: 50},
        CONTENT:{MIN:10, MAX:2000}
    }
    constructor(){
        this.endpoint = `https://${process.env.REACT_APP_ARTICLE_API_URI}/articles`;
        this.baseURI = `https://${process.env.REACT_APP_ARTICLE_API_URI}` || ""; 
       this.ignHttpRequest = new IgnRequest({baseURL:this.baseURI})
       this.ignHttpRequest.setHeaders();

    }

    DataArticles: ArticleDataType[]  = [
        {
            title: 'Ashton Jones She Got Next',
            image_url:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
            dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
            Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
            author: 'Cierra Bellamy',
            published:"06/21/2023"
    },
    {
        title: 'Austin Brown: The Legacy of a Family',
        image_url:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Tori Kelly: Navigating faith in the industry',
        image_url:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Daniel Caesar Featured Artist of the Month',
        image_url:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },
    {
        title: 'Georgia Reign: Latest Album - Love',
        image_url:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: 'Cierra Bellamy',
        published:"06/23/2023"
    },

]

    default(){
        return {
            id: '',
            name: 'default',
            email: '',
            username:'',
            role:{ id:'',type:'' }
            
        }
    }

    

    
    async get(article_id:string,withDrafts = false){
        console.log("called to get articles")
        let uri = withDrafts ? `/${article_id}/drafts` : `/${article_id}`
  
        try{
         
            let response = await this.ignHttpRequest.get(`${this.endpoint}${uri}`,{});
            if(response.status !== 200){ return null}
            return response;
        }
        catch(error){
            console.error(error)
            return null;
        }
    }

    async getWithDrafts(article_id:string){
        return this.DataArticles;
    }

    async getAll(){
        return this.DataArticles;
    }
    async retreiveAll() {
        try {
            let userArticles = await this.getAll();
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
        }
    }

    async retrieveDraftsByArticle(id:string){
        try{
            let response = await this.get(id,true);
            if(!response){ return null}
            return response.data;
        }
        catch(error){
            console.error(error)
            return null;
        }
       
   
    }
    async retrieveByUser(id:string){
        try {
            let userArticles = await this.getAll();
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
        }  
    }
    async retrieveById(id:string){
        try {
            let userArticles = await this.getAll();
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
        }  
    }

    async getAllFromUser(user_id:string){
        try {
            let userArticles = await this.getAll();
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
        }  
    }



    async update(article_id:string, Article:ArticleDataType){
        const data = {"data":Article}
        let token = process.env.REACT_APP_DEV_ACCESS_TOKEN;
        const headers =  {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        

        }
        this.ignHttpRequest.setHeaders(headers);
        try{
         
            let response = await this.ignHttpRequest.put(this.endpoint,data);
            if(response.status !== 200){ return false}
            return response;
        }
        catch(error){
            console.error(error)
            return null;
        }
    }

    async create(Article:ArticleDataType){
        const data = {"data":Article}
        let token = process.env.REACT_APP_DEV_ACCESS_TOKEN;
        const headers =  {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        

        }
        this.ignHttpRequest.setHeaders(headers);
        try{
         
            let response = await this.ignHttpRequest.post(this.endpoint,data);
            if(response.status !== 201){ return false}
            return response;
        }
        catch(error){
            console.error(error)
            return null;
        }
    }

    async createOrUpdate(Article:ArticleDataType,article_id = ""){
        try {
            const token = process.env.REACT_APP_DEV_ACCESS_TOKEN;
            const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            };
            const update = article_id !== ""
          
            this.ignHttpRequest.setHeaders(headers);
          
            const response = update
              ? await this.ignHttpRequest.put(`${this.endpoint}/${article_id}`, { data: Article })
              : await this.ignHttpRequest.post(this.endpoint, { data: Article });
            if (response.status !== (update ? 200 : 201)) {
              return false;
            }
          
            return response;
          } catch (error) {
            console.error(error);
            return null;
          }
    }

    async delete(article_id:string){

    }
    


}

export default Article;