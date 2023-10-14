import { EnumType } from "typescript"

export interface ArticleDataType {
    title:string,
    image:string,
    content:string,
    author:string,
    published:string
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

export interface UserDataType {
    id: string,
    name:string,
    email?:string,
    username?:string,
    role?:object
}


enum HttpMethods {
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}

export interface httpDataObject {
    data:object
}

export interface httpHeader {
    "Access-Control-Allow-Origin"?:string,
    Authorization?:string,
    "Content-Type"?:string,
}

export interface HttpConfigurationType {
    baseURL:string,
    timeout?: number,
    headers?:any
}
