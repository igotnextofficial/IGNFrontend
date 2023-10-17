import { ArticleDataType, UserDataType, httpDataObject } from "../../types/DataTypes";
import IgnRequest from "../../features/Http/IgnRequest";

class Article{
    endpoint: string
    baseURI: string
    static readonly TITLE = "title";
    static readonly CONTENT = "content";
    static readonly STORAGE_ACCESS_KEY: string = "articles";
    static readonly ACCESS_TOKEN: string = "accessToken";

    static readonly RANGE_LIMITS = {
        TITLE:{MIN: 5,MAX: 20},
        CONTENT:{MIN:10, MAX:500}
    }
    constructor(){
        this.endpoint = `https://${process.env.REACT_APP_ARTICLE_API_URI}/articles`;
        this.baseURI = `https://${process.env.REACT_APP_ARTICLE_API_URI}` || ""; 
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
    
    async get(article_id:string){

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

    async retrieveDraftsByUser(id:string){
        try {
            let userArticles = await this.getAll();
            return userArticles;
        } catch (error) {
            console.error("Error retrieving articles:", error);
            return []; // Return empty array in case of error, or handle it as per your requirement
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

    }

    async create(Article:ArticleDataType){}

    async delete(article_id:string){

    }
    


}

export default Article;