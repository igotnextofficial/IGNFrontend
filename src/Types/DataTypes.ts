import { ArticleCategories } from "./ArticleCategories"
import { Roles } from "./Roles"
export interface AlbumDataType{
    title:string,
    duration:number,
}

export interface RoleDataType{
    id:string,
    type:Roles
}
export interface SongDataType{
    title:string,
    duration: number
}

export interface UserDataType {
    [key:string]: any,
    id:string,
    fullname:string,
    username?:string,
    role: RoleDataType,
    profile_photo_path?:string,
    bio?:string,
}
export interface MentorDataType extends UserDataType {
    availability:boolean,
    specialties:string[],
    mentees:MenteeDataType[]
}


export interface ArtistDataType extends UserDataType {
    genre:string,
    bio:string,
    songs?:string[],
    albums?:string[]
}

export interface MenteeDataType extends ArtistDataType {
    request_id:string,
    mentor?: MentorDataType | null,
    mentorSession?:MentorSessionDataType[],
    session_date:string,
    progress:number,
    status:string
}

export interface CalendarDataType{
    month:string,
    day:string,
    time:string
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


export interface ArticleDataType {
    id?:""
    title:string,
    image_url:string,
    content:string,
    author:UserDataType,
    published:string,
    category?:string,
    user_id?:string,
    drafts?:ArticleDataType[], 
    created_at?:string,
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
    data:Record<string,any>,
    errors?:string[],
}

export interface HttpHeaders {
    "Access-Control-Allow-Origin"?: string;
    Authorization?: string;
    "Content-Type"?: string;
    Accept?: string;
    "Cache-Control"?: string;
    "X-Requested-With"?: string;
    "User-Agent"?: string;
    Origin?: string;
    Referer?: string;
    "Accept-Language"?: string;
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
    DropDown = "dropdown",
    MultiChoiceList = "multi-choice-list",
    ChoiceList = "choice-list",
    Image = "media"
}

export interface structureDataType{
    label:string,
    visibility:boolean,
    display:displayType, // multiChoiceList,choiceList,string,text
    placeholder?:string,
    props:object,
    order: number,
    default?:string,
    options?: string[]

}



export interface listDisplayDataType{
    title:string,
    image_url:string,
    subtitle:string
    meta?:string
}

export interface PaymentInformation{
    cardholderInformation: { 
      fullname:string, 
      address:string,
      zipCode:number,
      city:string,
      state:string
    },
    paymemtInformation:{
      cardNumber:number,
      cvc:number,
      expiration:Date
    }
    goals?:string,
  
  }

  export interface Page{
    slug:string,
    name:string,
    order: number,
    display:boolean
}

export interface validationObject {
    [key:string]:{
        method:(value:any,value2?:any) =>  boolean, 
        valid:boolean,
        message:string
    }
}

export interface FieldErrorMaintainerType {
    [key: string]: {
        valid: boolean;
        message: string;
    };
}