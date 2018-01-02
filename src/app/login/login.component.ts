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

	ngOnInit() {
		// reset login status
		//this.authenticationService.logout();
	}

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
}

/*
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {}

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
*/
