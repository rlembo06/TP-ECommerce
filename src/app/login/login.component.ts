import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthentificationService } from '../../services/authentification.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthentificationService]
})

export class LoginComponent implements OnInit {

	model: any = {};
	loading = false;
	error = '';
    results;
    username: string;
	password: string;

	constructor(
		private router: Router,
		private authenticationService: AuthentificationService
	) { }

	ngOnInit() {}

	login(username, password) {

		this.authenticationService.login(username, password)
			.subscribe(result => {
                console.log(result);
				if (result === true) {
					this.router.navigate(['/']);
				} else {
					console.log('Username or password is incorrect');
					//this.error = 'Username or password is incorrect';
					//this.loading = false;
				}
			});
    }
    
    checkAuth(): boolean {
        var tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) {
            return true;
        } else {
            return false;
        }
    }
}
