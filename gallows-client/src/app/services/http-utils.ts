import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpUtils {

    constructor(private http: Http) { }



    public get(url : string) : Promise<any> {
        return this.http.get(url)
        .toPromise()
        .catch(error => {
            console.log(error);
            throw error;
        });
    }

    public post(url : string, body : any ) : Promise<any>{
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.post(url, body, {headers: headers})
        .toPromise()
        .catch(error => {
            console.log(error);
            throw error;
        });
    }

}
