import StorageInterface  from './StorageInterface';
import {StorageTypes} from './StorageTypes';
import storageClasses from './StorageRegistration';

class Storage implements StorageInterface {
   private readonly supportedStorageTypes =  Object.values(StorageTypes);
   private readonly storage:StorageInterface | null = null;
   
   constructor(storageType = StorageTypes.LocalStorage) {

        if(!this.supportedStorageTypes.includes(storageType)){
            throw new Error('Unsupported storage type');
        }

        const storageInstance = storageClasses.get(storageType);
        
        if(!storageInstance){
            throw new Error('Storage type not registered');
        }
        
        this.storage = storageInstance

    }

    storageIsNotIntialized(): boolean {
        return this.storage === null || this.storage === undefined;
    }

    save(key: string, value: any) {
        if(this.storageIsNotIntialized() ){
            throw new Error('Storage not initialized');
        }

        this.storage!.save(key,value );
    }

    load(key: string): any {
        if(this.storageIsNotIntialized()){
            throw new Error('Storage not initialized');
        }
        return this.storage!.load(key);
    }

    remove(key:string): void {
        if(this.storageIsNotIntialized()){
            throw new Error('Storage not initialized');
        }
        this.storage!.remove(key);
    }

    hasItem(key: string): boolean {
        if(this.storageIsNotIntialized()){
            throw new Error('Storage not initialized');
        }
        return this.storage!.hasItem(key);
    }
}

export default Storage;