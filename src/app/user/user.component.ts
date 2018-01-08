/*
 * https://www.concretepage.com/angular-2/angular-2-formcontrol-example
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { TextEqualityValidatorModule } from "ngx-text-equality-validator";
import { UserService } from '../../services/user.service';
import { User } from '../../class/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [UserService]

})
export class UserComponent implements OnInit {
    
    public user: User;

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
        private router: Router,
        private formBulder: FormBuilder,
        private userService : UserService
        
    ) { 
        var token = localStorage.getItem('currentUser');
        this.user = JSON.parse(token);
        console.log(this.user);
    }

    ngOnInit() {
        
        this.username = this.user.username;
        this.email = this.user.email;
        this.firstname = this.user.firstname;
        this.lastname = this.user.lastname;
        this.city = this.user.city;
        this.street = this.user.street;
        this.cp = this.user.cp;
        this.country = this.user.country;
        
        this.username_ctrl = this.formBulder.control(this.user.username);
        this.email_ctrl = this.formBulder.control(this.user.email);
        this.firstname_ctrl = this.formBulder.control(this.user.firstname);
        this.lastname_ctrl = this.formBulder.control(this.user.lastname);
        this.city_ctrl = this.formBulder.control(this.user.city);
        this.street_ctrl = this.formBulder.control(this.user.street);
        this.cp_ctrl = this.formBulder.control(this.user.cp);
        this.country_ctrl = this.formBulder.control(this.user.country);

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

    updateUser() {

        this.userService.updateUser(this.updateUserForm.value)
            .subscribe(result => {
                alert(result);
            });
        
        this.userService.getUser()
            .subscribe(result => {
                localStorage.setItem('currentUser', JSON.stringify(result));
                var tokenUser = localStorage.getItem('currentUser');
                this.user = JSON.parse(tokenUser);
                this.router.navigate(['/user']);
            });
    }
}
