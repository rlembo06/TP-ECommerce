import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import jwt from 'angular2-jwt-simple';
var jwt = require('angular2-jwt-simple');
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthentificationService {

	public token: string;
    public results = [];
    public authentified = false;
    private uri: string;

	constructor(
        private http: Http,
        private router: Router,
    )
    {
		this.uri = "http://localhost:3000/";
	}

	getUsers() {
		return this.http.get(this.uri + "user/all");
	}

    login(username: string, password: string): Observable<boolean> {

        var user = {
			username: username,
			password: password
        };

        let headers = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.uri + "user/login", JSON.stringify(user), options)
            .map((response: Response) => {

                this.token = jwt.decode(response.text(), 'secret');
                if (this.token) {

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));
                    var tokenUser = localStorage.getItem('currentUser');

                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

}
