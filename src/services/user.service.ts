import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../class/user';

@Injectable()
export class UserService {

    private uri: string;

    constructor(
        private http: Http,
    )
    {
		this.uri = "http://localhost:3000/";
	}

    createUser(user: User): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "user", JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response._body);
                return response._body;
            });
    }

    getUser(): Observable<User> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let user = localStorage.getItem('currentUser');
        return this.http.post(this.uri + "user/get", user, options)
            .map((response: Response) => {
                var result = response._body;
                return JSON.parse(result);
            });
    }

    /*
    getUser(): Observable<Object> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        let user = localStorage.getItem('currentUser');
        return this.http.post(this.uri + "user/get", user, options)
            .map((response: Response) => {
                var result = response._body;
                return JSON.parse(result);
            });
    }
    */

}
