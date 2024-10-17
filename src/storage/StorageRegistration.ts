import storageInterface from "./StorageInterface";
import { StorageTypes } from "./StorageTypes";
import LocalStorage from "./LocalStorage";
import SessionStorage from "./SessionStorage";
import CookieStorage from "./CookieStorage";
const storageClasses = new Map<string, storageInterface>();

storageClasses.set(StorageTypes.LocalStorage, new LocalStorage());
storageClasses.set(StorageTypes.SessionStorage, new SessionStorage());
storageClasses.set(StorageTypes.CookieStorage, new CookieStorage());



export default storageClasses;