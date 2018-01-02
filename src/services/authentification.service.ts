import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthentificationService {

	public token: string;
	public results = [];
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
                // login successful if there's a jwt token in the response
                let token = response.json();
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    var tokenUser = localStorage.getItem('currentUser');
                    console.log('Token user :', tokenUser);
                    //console.log('Token user check :', tokenUser);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
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
