import storageInterface from "./StorageInterface";
import CryptoJs from 'crypto-js';

export default class LocalStorage implements storageInterface {
    private domain = process.env.REACT_APP_DOMAIN ?? "";
    private readonly secret_key = process.env.REACT_APP_SECURE_SERCET_KEY_STORAGE ?? ""
    save(key: string, value: any,secure:boolean = false) {
        try{
            let previous_data = localStorage.getItem(this.domain) || "";
            let previous_data_object = previous_data ? this.convertToObject(previous_data) : {};
            let new_data = {...previous_data_object,[key]:value};
            const converted_value = JSON.stringify(new_data);
            // console.log(`saving  ${converted_value} and domain ${this.domain}`);
            if(!secure){
              localStorage.setItem(this.domain,converted_value );  
            }
            else{
                let cipher_text = this.encrypt(converted_value);
                localStorage.setItem(this.domain, cipher_text);
            }

        }
        catch(e){
         console.log(`error in saving data ${e}`);
        }

    }

    /*  
        @description loads and parses data into object form from local storage
        @params key: string
        @params secure: boolean
        @returns any
    */
    load(key: string,secure:boolean = false): any {
        let data = localStorage.getItem(this.domain) ?? "";
        let stored_data =  this.convertToObject(data);
        if(!secure){
            return stored_data[key] ?? null;
        }
        let decrypted_data = this.decryptAndConvertToObject(data)
        // console.log(`decrypted data is ${decrypted_data} and the key is key ${key}` );
        return decrypted_data[key] ?? null;
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
        // console.log(`checking if ${key} exists`);
        let domain_name_exist_in_storage = localStorage.getItem(this.domain) !== null;
        if(!domain_name_exist_in_storage){
            // console.log(`domain ${this.domain} does not exist in storage`);
            return false;
        }
        let data = localStorage.getItem(this.domain) ?? "";
        // console.log(`data in storage ${data}`);
        let decrypted_data = this.decryptAndConvertToObject(data);

        return key in decrypted_data
    }

    convertToObject(data: string){
        // console.log(`converting data to object ${data}`);
        if(data.trim() === ""){return {}}
        return JSON.parse(data);
    }
    
    removeAll(): void {
        localStorage.removeItem(this.domain);
    }

    private encrypt(data: string): string {
        try{
            return data;
            const bytes = CryptoJs.AES.encrypt(data, this.secret_key);
            return bytes.toString();
        }
        catch(e){
            // console.error(`failed L error in encrypting data ${e}`);
            return data;
        }       
        
    }

    private decrypt(data: string): string {
        try{
            return data;
            const bytes = CryptoJs.AES.decrypt(data, this.secret_key);
            return bytes.toString(CryptoJs.enc.Utf8);
        }
        catch(e){
            // console.error(`failed L error in decrypting data ${e}`);
            return "";
        }
     
    }

    private decryptAndConvertToObject(data: string): any {
        const decryptedData = this.decrypt(data);
        // console.log(`passed in data is ${data} and decrypted data is ${decryptedData}`);
        return this.convertToObject(decryptedData);
    }
    
}