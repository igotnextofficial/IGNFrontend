import { EnumType } from "typescript"
import { ArticleCategories } from "./ArticleCategories"

export interface MentorDataType {
    id:string,
    name:string,
    image:string,
    bio:string
}
export interface ArticleDataType {
    id?:""
    title:string,
    image_url:string,
    content:string,
    author:string,
    published:string
    category?:string
    user_id?:string
    drafts?:ArticleDataType[] 
}

export interface ArticleSavedDataType {
    title:string,
    content:string,
    category:ArticleCategories,
    image:File | null,
}
export interface Settings {
    title:string,
    slug:string
}

export interface TaskDataType {
    title:string,
    assignedBy:string,
    dueDate:string,
    status:string,
    type:string
}
export interface ArtistDataType {
    name:string,
    image:string,
    genre:string,
    songs?:string[],
    albums?:string[]
}

export interface MentorDataType {
    name:string,
    image:string,
    bio:string,
}
export interface UserDataType {
    id: string,
    name:string,
    email?:string,
    username?:string,
    role?:object
}




export interface httpDataObject {
    data:object
}

export interface HttpHeaders {
    "Access-Control-Allow-Origin"?:string,
    Authorization?:string,
    "Content-Type"?:string,
}

export interface HttpConfigurationType {
    baseURL:string,
    timeout?: number,
    headers?:any
}

export interface EditorDataType {
    height?:250,
    article:ArticleDataType
    handleDraft:(data:ArticleDataType)=>void,
    handleReview:(status:string)=>void
}

export interface RangeLimitsDataType{
    min:number,
    max:number
}
export interface EditorRangeLimitsDataType {
    title:RangeLimitsDataType
    content:RangeLimitsDataType
}

export type EditorRangeSelectorDataType = "title" | "content"

export interface ListDataType {
    id?:string
    title:string,
    image_url:string,
    content:string,
    author?:string,
    link?:string
    category?:string
}

export enum ByteType{
    Bytes = "b",
    KiloBytes = "kb",
    MegaBytes = "mb",
    GigaBytes = "gb"
}

enum HttpMethods {
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}

export enum ValidFileTypes {
    MP3 = "mp3",
    MP4 = "mp4",
    JPEG = "jpeg",
    JPG = "jpg",

}



