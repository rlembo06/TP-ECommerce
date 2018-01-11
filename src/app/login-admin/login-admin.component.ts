import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';

import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
  providers: [AuthentificationService]

})
export class LoginAdminComponent implements OnInit {

    public username_ctrl: FormControl;
    public password_ctrl: FormControl;
    public loginAdminForm: FormGroup;

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private authenticationService: AuthentificationService,
	) { }

    ngOnInit() {

        this.username_ctrl = this.formBulder.control('', Validators.required);
        this.password_ctrl = this.formBulder.control('', Validators.required);

        this.loginAdminForm = this.formBulder.group({
            username: this.username_ctrl,
            password: this.password_ctrl
        });

    }

    loginAdmin() {
        console.log(this.loginAdminForm.value);

        this.authenticationService.loginAdmin(this.loginAdminForm.value)
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.router.navigate(['/admin']);
                }
            },
            err => alert(err.text())
        );
    }
}
