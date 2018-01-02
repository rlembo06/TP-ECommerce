import { Component, OnInit } from '@angular/core';

import { AuthentificationService } from '../../services/authentification.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [AuthentificationService]
})
export class DashboardComponent implements OnInit {

    title = 'Dashboard';

    constructor(
		private authenticationService: AuthentificationService
	) { }

    ngOnInit() {
    }

    logout(): void {
        console.log('Logout');
        this.authenticationService.logout();
    }

}
