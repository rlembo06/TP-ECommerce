import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from '../services/authentification.service';
import {LoginAdminComponent} from './login-admin/login-admin.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthentificationService]
})

export class AppComponent  implements OnInit {
    public numberArticle: number;

    constructor(
		private authenticationService: AuthentificationService
    ) {}

    ngOnInit() {
        this.numberArticle =  this.numberArticles();
    }

    logout(): void {
        this.authenticationService.logout();
    }

    logoutAdmin(): void {
        this.authenticationService.logoutAdmin();
    }

    checkAuth(): boolean {
        let tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        return false;
    }

    checkAuthAdmin(): boolean {
        let tokenUser = localStorage.getItem('currentAdmin');

        if (tokenUser !== null) return true;
        return false;
    }

    checkPannier(): boolean {
        let tokenPannier = localStorage.getItem('tokenPannier');

        if (tokenPannier !== null) return true;
        return false;
    }

    numberArticles(): number {
        let tokenPannier = JSON.parse(localStorage.getItem('tokenPannier'));
        return tokenPannier.length;
    }
}
