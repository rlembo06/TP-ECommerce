import { Component } from '@angular/core';

import { AuthentificationService } from '../services/authentification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AuthentificationService]
})

export class AppComponent {
    title = 'app';

    constructor(
		private authenticationService: AuthentificationService
    ) {}
    
    logout(): void {
        console.log('Logout');
        this.authenticationService.logout();
    }
}
