import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {

    private uri: string;

    constructor(
        private http: Http,
    )
    {
		this.uri = "http://localhost:3000/";
	}

    createUser(user: Object): void {
        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        console.log(user);
        console.log(JSON.stringify(user));
        this.http.post(this.uri + "user/new", JSON.stringify(user), options)
            .subscribe(result => {
                console.log(result);
            });
    }

}
