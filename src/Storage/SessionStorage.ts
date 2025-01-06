import StorageInterface  from './StorageInterface';
export default class SessionStorage implements StorageInterface {


    save(data: any) {     
        sessionStorage.setItem('data', data);
    }

    load() {
        return sessionStorage.getItem('data');
    }

    remove(): void {

        sessionStorage.removeItem('data');
    }

    hasItem(key: string): boolean {
        return sessionStorage.getItem(key) !== null;
    }

    removeAll(): void { }

}
