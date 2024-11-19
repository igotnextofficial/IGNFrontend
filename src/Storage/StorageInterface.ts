export default interface storageInterface {
    save(key: string, value: any): void;
    load(key:string): any;
    remove(key:string): void;
    hasItem(key:string): boolean;
    removeAll(): void;
}