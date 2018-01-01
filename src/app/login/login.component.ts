import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;
    error = '';
    results = 'EMPTY';

    constructor(
        private router: Router,
        private authenticationService: AuthentificationService
    ) {}

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
    }
    
    onSubmit(f: NgForm) {
        console.log(f.value);  // { first: '', last: '' }
        console.log(f.valid);  // false

        //this.authenticationService.login(f.value);
        //this.authenticationService.getUsers();

        this.authenticationService.getUsers()
            .map(res => res.json())
            .subscribe(res => this.results = res);
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
