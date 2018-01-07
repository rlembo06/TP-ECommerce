/*
 * https://www.concretepage.com/angular-2/angular-2-formcontrol-example
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { TextEqualityValidatorModule } from "ngx-text-equality-validator";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService]

})
export class UserComponent implements OnInit {

    public id: number;
    public username: string;
    public password: string;
    public email: string;
    public lastname: string;
    public firstname: string;
    public city: string;
    public street: string;
    public cp: number;
    public country: string;

    public username_ctrl: FormControl;
    public email_ctrl: FormControl;
    public firstname_ctrl: FormControl;
    public lastname_ctrl: FormControl;
    public password_ctrl: FormControl;
    public confirmPassword_ctrl: FormControl;
    public city_ctrl: FormControl;
    public street_ctrl: FormControl;
    public cp_ctrl: FormControl;
    public country_ctrl: FormControl;

    public updateUserForm: FormGroup;

    constructor(
        private formBulder: FormBuilder,
        private userService : UserService
    ) { }

    ngOnInit() {

        this.userService.getUser()
            .subscribe(result => {
                this.username = result.username;
                this.email = result.email;
                this.firstname = result.firstname;
                this.lastname = result.lastname;
                this.city = result.city;
                this.street = result.street;
                this.cp = result.cp;
                this.country = result.country;
            });

        this.username_ctrl = this.formBulder.control(this.username);
        this.email_ctrl = this.formBulder.control(this.email);
        this.firstname_ctrl = this.formBulder.control(this.firstname);
        this.lastname_ctrl = this.formBulder.control(this.lastname);
        this.city_ctrl = this.formBulder.control(this.city);
        this.street_ctrl = this.formBulder.control(this.street);
        this.cp_ctrl = this.formBulder.control(this.cp);
        this.country_ctrl = this.formBulder.control(this.country);

        this.updateUserForm = this.formBulder.group({
            username: this.username_ctrl,
            email: this.email_ctrl,
            lastname: this.firstname_ctrl,
            firstname: this.lastname_ctrl,
            city: this.city_ctrl,
            street: this.street_ctrl,
            cp: this.cp_ctrl,
            country: this.country_ctrl
        });
    }

    createUser() {
        console.log(this.updateUserForm.value);
        /*
        this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);
            });
        */
    }
}
