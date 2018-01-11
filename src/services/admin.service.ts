import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../class/category';
import { IOption } from 'ng-select';

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

    getCategories(): Observable<Array<Category>> {

        let user = localStorage.getItem('currentUser');
        return this.http.get(this.uri + "admin/category/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    updateCategory(category: Category): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.uri + "admin/category", JSON.stringify(category), options)
            .map((response: Response) => {
                console.log(response.text());
                return response.text();
            });
    }

}

