import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../class/category';

@Injectable()
export class AdminService {

    private uri: string;

    constructor(
        private http: Http
    )
    {
		this.uri = "http://localhost:3000/";
    }

    createCategory(category: Category): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "admin/category/create", JSON.stringify(category), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

}

