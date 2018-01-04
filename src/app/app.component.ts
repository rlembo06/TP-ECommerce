import { Component } from '@angular/core';

import { AuthentificationService } from '../services/authentification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthentificationService]
})

export class AppComponent {
    public title = 'app';
    
    constructor(
		private authenticationService: AuthentificationService
    ) {}
    
    logout(): void {
        this.authenticationService.logout();
    }

    checkAuth(): boolean {
        var tokenUser = localStorage.getItem('currentUser');

        if (tokenUser !== null) return true;
        return false;
    }
}
