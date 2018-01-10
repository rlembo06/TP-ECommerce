import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  providers: [AuthentificationService]

})
export class LoginAdminComponent implements OnInit {

    public username: string;
	public password: string;

	constructor(
		private router: Router,
        private authenticationService: AuthentificationService,
	) { }

  ngOnInit() {
  }

  loginAdmin(username, password) {

    this.authenticationService.loginAdmin(username, password)
        .subscribe(result => {
            console.log(result);
            if (result === true) {
                this.router.navigate(['/']);
            }
        },
        err => alert(err.text())
    );
}
}
