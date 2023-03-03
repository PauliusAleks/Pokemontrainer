import { HttpClient } from "@angular/common/http";



export class StorageUtil {

    constructor(private httpClient: HttpClient) { }

    public static storageSave<T>(key: string, value: T): void {
        //stringify because session can not store objects
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    //Generic read storage function - returns storage item or undefined
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key); //gets item by key
        try {
            if (storedValue) {//if not undefined
                return JSON.parse(storedValue) as T;//return value in JSON
            }
            else {
                return undefined;
            }
        }
        catch(e){
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}
    


