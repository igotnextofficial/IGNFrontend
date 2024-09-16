import storageInterface from "./StorageInterface";
import CryptoJs from 'crypto-js';

export default class LocalStorage implements storageInterface {

    private readonly secret_key = process.env.REACT_APP_SECURE_SERCET_KEY_STORAGE ?? ""
    save(key: string, value: any) {
        try{
            if(typeof value === 'object'){
                value = JSON.stringify(value);
            }
            let cipher_text = CryptoJs.AES.encrypt( value, this.secret_key).toString();
            localStorage.setItem(key, cipher_text);
        }
        catch(e){
            console.error(`Error saving to local storage ${e}`);
        }
    }

    load(key: string) {
        let data = localStorage.getItem(key) ?? "";
        const bytes = CryptoJs.AES.decrypt(data, this.secret_key);
        return bytes.toString(CryptoJs.enc.Utf8);
    }

    remove(key:string): void {
        localStorage.removeItem(key);
    }

    hasItem(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    convertToObject(data: string){
        if(data.trim() === ""){return {}}
        return JSON.parse(data);
    }
    
}