import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { AuthentificationService } from '../services/authentification.service';
import { ShopService } from '../services/shop.service';
import {LoginAdminComponent} from './login-admin/login-admin.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthentificationService]
})

export class AppComponent  implements OnInit {
    private numberArticle: number;
    private observableArticle: Observable<number>;

    constructor(
        private authenticationService: AuthentificationService,
        private shopService: ShopService
    ) {}

    ngOnInit() {
        // https://angular-2-training-book.rangle.io/handout/observables/using_observables.html
        this.observableArticle =  new Observable(observer => {
            observer.next(
                this.shopService.numberArticles()
            );
        });

        let articles = this.observableArticle.subscribe(
            value => this.numberArticle = value,
            error => console.log(error)
        );
        console.log( this.numberArticle );
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
}
