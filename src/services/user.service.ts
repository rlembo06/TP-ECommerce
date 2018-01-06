import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

    private uri: string;

    constructor(
        private http: Http,
    )
    {
		this.uri = "http://localhost:3000/";
	}

    createUser(user: Object): Observable<string> {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        console.log(user);
        console.log(JSON.stringify(user));
        return this.http.post(this.uri + "user/new", JSON.stringify(user), options)
            .map((response: Response) => {
                console.log(response._body);
                return response._body;
            });
    }

}
