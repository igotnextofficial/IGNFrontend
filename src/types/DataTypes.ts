import { ArticleCategories } from "./ArticleCategories"
import { Roles } from "./Roles"
export interface AlbumDataType{
    title:string,
    duration:number,
}

export interface SongDataType{
    title:string,
    duration: number
}

export interface UserDataType {
    id:string,
    fullname:string,
    role:Roles
    image?:string,
    bio?:string,
}
export interface MentorDataType {
    id:string,
    fullname:string,
    username?:string,
    image:string,
    role:Roles,
    bio:string,
    availability:boolean,
    specialties:string[],
    mentees:MenteeDataType[]
}

export interface CalendarDataType{
    month:string,
    day:string,
    time:string
}
export interface MenteeDataType extends ArtistDataType {
    id:string,
    request_id:string,
    mentor?: MentorDataType | null,
    mentorSession?:MentorSessionDataType[],
    nextSession:string,
    progress:number,
    status:string
}

export interface MentorSessionDataType {
    id:string,
    mentor_id:string,
    mentee_id:string,
    currentSessionNumber: number,
    maxSessionNumber:number,
    nextSession:string,
    previousSession:string,
}

export interface ArtistDataType {
    id:string,
    fullname:string,
    username:string,
    image:string,
    role:Roles
    genre:string,
    bio:string,
    songs?:string[],
    albums?:string[]
}
export interface ArticleDataType {
    id?:""
    title:string,
    image_url:string,
    content:string,
    author:string,
    published:string,
    category?:string,
    user_id?:string,
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
    height?:number,
    article:ArticleDataType,
    handleDraft:(data:ArticleDataType)=>void,
    handleReview:(status:string)=>void
}

export interface RangeLimitsDataType{
    min:number,
    max:number
}
export interface EditorRangeLimitsDataType {
    title:RangeLimitsDataType,
    content:RangeLimitsDataType
}

export type EditorRangeSelectorDataType = "title" | "content"

export interface ListDataType {
    id?:string
    title:string,
    image_url:string,
    content:string,
    author?:string,
    link?:string,
    category?:string
}

export enum ByteType{
    Bytes = "b",
    KiloBytes = "kb",
    MegaBytes = "mb",
    GigaBytes = "gb"
}

export enum HttpMethods {
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

export enum displayType {
    InputValue = "input-value",
    TextValue = "text-value",
    MultiChoiceList = "multi-choice-list",
    ChoiceList = "choice-list",
    Image = "image"
}

export interface structureDataType{
    label:string,
    visibility:boolean,
    display:displayType, // multiChoiceList,choiceList,string,text
    placeholder?:string,
    props:object,
    order: number,
    options?: string[]

}



export interface listDisplayDataType{
    title:string,
    image_url:string,
    subtitle:string
    meta?:string
}

