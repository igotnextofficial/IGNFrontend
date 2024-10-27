import storageInterface from "./StorageInterface";
import CryptoJs from 'crypto-js';

export default class LocalStorage implements storageInterface {

    private readonly secret_key = process.env.REACT_APP_SECURE_SERCET_KEY_STORAGE ?? ""
    save(key: string, value: any,secure:boolean = true) {
        try{
            if(!secure){
              localStorage.setItem(key, value);  
            }
            else{

                if(typeof value === 'object'){
                    value = JSON.stringify(value);
                }
                let cipher_text = CryptoJs.AES.encrypt( value, this.secret_key).toString();
                localStorage.setItem(key, cipher_text);
            }

        }
        catch(e){
       
        }

    }

    load(key: string,secure:boolean = true): any {
        let data = localStorage.getItem(key) ?? "";
        if(!secure){
            return data;
        }
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