import { ArticleDataType, ArticleSavedDataType} from "../../types/DataTypes";
import IgnRequest from '../../features/http/IgnRequest';
import User from "./User";
import { ArticleCategories } from "../../types/ArticleCategories";
import { APP_ENDPOINTS } from "../../config/app";
import { Roles } from "../../types/Roles";

class Article{
    endpoint: string
    baseURI: string
    ignHttpRequest: IgnRequest;


    static readonly defaultEmptyArticle:ArticleSavedDataType = {
        title:"",
        content:"",
        category:ArticleCategories.DEFAULT,
        image:null,
    }
    static readonly defaultResponse:ArticleDataType = {
        title:"",
        image_url:"",
        content:"",
        category:ArticleCategories.DEFAULT,
        author: {id:'',fullname:' ',role:{id:'',type:Roles.ADMIN}},
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
            author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
            published:"06/21/2023"
    },
    {
        title: 'Austin Brown: The Legacy of a Family',
        image_url:'https://www.billboard.com/wp-content/uploads/media/austin-brown-650.jpg?w=650',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Tori Kelly: Navigating faith in the industry',
        image_url:'https://www.tampabay.com/resizer/lPpF9C1uMXYLL7E3pNQ9KSujOMU=/1200x1200/smart/cloudfront-us-east-1.images.arcpublishing.com/tbt/PTRAU3GGOMI6TCHRIBWI6S7HAY.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Daniel Caesar Featured Artist of the Month',
        image_url:'https://images.discotech.me/artists/None/ad2bfe02-4323-41e2-8c0e-979c237a0d3f.jpg?auto=format%2Ccompress&w=1000',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },
    {
        title: 'Georgia Reign: Latest Album - Love',
        image_url:'https://singersroom.com/wp-content/uploads/2016/10/Georgia-Reign.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/23/2023"
    },

]

TempArticles: ArticleDataType[]  = [
    {
        title: 'Colla he Got Next',
        image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published: "06/21/2023"
    },
    {
        title: 'Colla: The Legacy of a Family',
        image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published: "06/23/2023"
    },
    {
        title: 'Colla: Navigating faith in the industry',
        image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published: "06/23/2023"
    },
    {
        title: 'Colla Featured Artist of the Month',
        image_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/a1/6e/78a16e10-5fb6-b466-7b14-845e9ea7e0d2/artwork.jpg/1200x630bb.jpg',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
    dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
    Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published: "06/23/2023"
    },
    {
        title: 'Ashton Jones She Got Next',
        image_url:'https://i0.wp.com/starmometer.com/wp-content/uploads/2011/03/ashton.jpg?w=520&ssl=1',
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nobis eligendi, 
        dolor ab, quasi recusandae aliquam voluptatem nesciunt ea dignissimos perferendis? 
        Cum ipsum voluptates nesciunt fugiat! Enim nihil illum id!`,
        author: {id:'',fullname:'Cierra Bellamy',role:{id:'',type:Roles.ADMIN}},
        published:"06/21/2023"
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

    getUserAccessToken(){
        let user = new User()
        return user.getUserAccessToken()
    }

    addToken(){
        const token = this.getUserAccessToken();
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };
     
        this.ignHttpRequest.setHeaders(headers);
    }

    
    async get(article_id:string,withDrafts = false){

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

    async retreiveAll(category="") {
        try {
            
            let myendpoint = category.trim() !== "" ? `${APP_ENDPOINTS.ARTICLES.CATEGORY}/${category}` : APP_ENDPOINTS.ARTICLES.BASE
            this.addToken()
            let userArticles = await this.ignHttpRequest.get( myendpoint);
            userArticles.data['data']['link']=`${category}/${userArticles.data['data']['id']}`
            return userArticles.data['data'];
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return null; // Return empty array in case of error, or handle it as per your requirement
        }
    }

    async retrieveFeatured(){
        try {
            let featuredArticles = await this.ignHttpRequest.get(APP_ENDPOINTS.ARTICLES.FEATURED);
            return featuredArticles.data['data'];
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
        }  
    }

    async retrieveByCategory(){
        try {
            let featuredArticles = await this.ignHttpRequest.get(APP_ENDPOINTS.ARTICLES.FEATURED);
            return featuredArticles.data['data'];
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
            let userArticles = null;
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return null; // Return empty array in case of error, or handle it as per your requirement
        }  
    }
    async retrieveById(id:string){
        try {
            let response = await await this.ignHttpRequest.get(APP_ENDPOINTS.ARTICLES.BASE + `/${id}`);
            if(!response){return null}
            return response.data['data'];
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
        let token = this.getUserAccessToken();
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
        let token = this.getUserAccessToken();
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
            const token = this.getUserAccessToken();
            const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            };
            const update = article_id !== ""
          
            this.ignHttpRequest.setHeaders(headers);
          
            const response = update
              ? await this.ignHttpRequest.put(`${this.endpoint}/${article_id}`, { data: Article })
              : await this.ignHttpRequest.post(this.endpoint, { data: Article });
          
            return response;
          } catch (error) {
            console.error(error);
            return null;
          }
    }

    async restore(article_id = ""){
        try{
            const token = this.getUserAccessToken();
            const headers = {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            };
            
            this.ignHttpRequest.setHeaders(headers);
            let response = await this.ignHttpRequest.put(`${this.endpoint}/${article_id}/restore`);
            return response;
        }
        catch(error){
            console.error(error);
            return null; 
        }

    }
    async delete(article_id:string){

    }
    


}

export default Article;