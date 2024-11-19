import storageInterface from "./StorageInterface";
import CryptoJs from 'crypto-js';

export default class LocalStorage implements storageInterface {
    private domain = process.env.REACT_APP_DOMAIN ?? "";
    private readonly secret_key = process.env.REACT_APP_SECURE_SERCET_KEY_STORAGE ?? ""
    save(key: string, value: any,secure:boolean = true) {
        try{
            const converted_value = JSON.stringify({[key]:value});
            console.log(`saving  ${converted_value} and domain ${this.domain}`);
            if(!secure){
              localStorage.setItem(this.domain,converted_value );  
            }
            else{

                if(typeof value === 'object'){
                    value = JSON.stringify({[key]:value});
                }
                let cipher_text = CryptoJs.AES.encrypt( value, this.secret_key).toString();
                localStorage.setItem(this.domain, cipher_text);
            }

        }
        catch(e){
       
        }

    }

    /*  
        @description loads and parses data into object form from local storage
        @params key: string
        @params secure: boolean
        @returns any
    */
    load(key: string,secure:boolean = true): any {
        let data = localStorage.getItem(this.domain) ?? "";
        if(!secure){
            return data;
        }
        let decrypted_data = this.decryptAndConvertToObject(data)
        return decrypted_data[key];
    }

    remove(key:string): void {
        
         if(!this.hasItem(key)){
            return; 
        }

        let data = localStorage.getItem(this.domain);
        if(data !== null){

            let decrypted_data = this.decryptAndConvertToObject(data);
            let data_to_remove = this.load(key);
            delete decrypted_data[key];
            let new_data = this.encrypt(JSON.stringify(decrypted_data));
            localStorage.setItem(this.domain,new_data);
        }
    }

    hasItem(key: string): boolean {
        console.log(`checking if ${key} exists`);
        let domain_name_exist_in_storage = localStorage.getItem(this.domain) !== null;
        if(!domain_name_exist_in_storage){
            return false;
        }
        let data = localStorage.getItem(this.domain) ?? "";
        let decrypted_data = this.decryptAndConvertToObject(data);

        return key in decrypted_data
    }

    convertToObject(data: string){
        if(data.trim() === ""){return {}}
        return JSON.parse(data);
    }
    
    removeAll(): void {
        localStorage.removeItem(this.domain);
    }

    private encrypt(data: string): string {
        return CryptoJs.AES.encrypt(data, this.secret_key).toString();
    }

    private decrypt(data: string): string {
        const bytes = CryptoJs.AES.decrypt(data, this.secret_key);
        return bytes.toString(CryptoJs.enc.Utf8);
    }

    private decryptAndConvertToObject(data: string): any {
        const decryptedData = this.decrypt(data);
        return this.convertToObject(decryptedData);
    }
    
}