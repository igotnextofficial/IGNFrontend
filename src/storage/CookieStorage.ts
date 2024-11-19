import storageInterface from "./StorageInterface";

export default class CookieStorage implements storageInterface{

    save(key: string, value: any, exipirationTime?: number) {
        const date = new Date();
        let timeToExpire = exipirationTime ? exipirationTime * 60 * 60 * 1000 :  60 * 60 * 1000
        date.setTime(date.getTime() +  timeToExpire);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${key}=${value}; secure; HttpOnly; SameSite=Strict; expires=${expires}; path=/`;    
    }

    load() {
        return document.cookie;
    }

    remove(key:string): void {
        document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    hasItem(key: string): boolean {
        return document.cookie.includes(key);
    }

    removeAll(): void { }
}