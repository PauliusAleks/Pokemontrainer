import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trainer } from "../models/trainer.model";


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


    // public storageRemove(username: string): Observable<Trainer> {
    //     const apiKey = environment.apiKey
    //     const apiUrl = environment.apiUrl
    //     const headers = new HttpHeaders({
    //         "content-type": "application/json",
    //         "x-api-key": apiKey
    //     });
    //     return this.httpClient.delete<Trainer>(apiUrl + `/${username}`, {headers})
    // }

    //!!!!!!!!!!!!!!!!
    public static storageDelete<T>(key: string, username: string, httpClient: HttpClient, callback: () => void): void {
        const trainer = StorageUtil.storageRead<T>(key);

        if(trainer) {
            const apiUrl = `${environment.apiUrl}?username=${username}`;
            const headers = new HttpHeaders({
                'content-type': 'application/json',
                'x-api-key': environment.apiUrl
            });
            const options = { headers: headers };
        

            httpClient.delete(apiUrl, options).subscribe(
              () => {
                console.log(`Trainer ${username} deleted from API`);
                callback();
            },
            error => console.error(`Error deleting user ${username} from API: ${error}`)
            );
        }
        sessionStorage.removeItem(key)
    }


}
    


