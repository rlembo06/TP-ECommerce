/*
 * TUTO : https://www.supinfo.com/articles/single/4283-bases-angular2
*/

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
})
export class NewuserComponent implements OnInit {

    public username_ctrl: FormControl;
    public email_ctrl : FormControl;
    public firstname_ctrl : FormControl;
    public lastname_ctrl : FormControl;
    public password_ctrl : FormControl;
    public password2_ctrl: FormControl;
    public createUserForm: FormGroup;
    
    constructor(
        private formBulder: FormBuilder
    ) {}

    ngOnInit() {
        
        this.username_ctrl = this.formBulder.control('', Validators.required);
        this.email_ctrl = this.formBulder.control('', Validators.required);
        this.firstname_ctrl = this.formBulder.control('', Validators.required);
        this.lastname_ctrl = this.formBulder.control('', Validators.required);
        this.password_ctrl = this.formBulder.control('', Validators.required);
        this.password2_ctrl = this.formBulder.control('', Validators.required);

        this.createUserForm = this.formBulder.group({
            username: this.username_ctrl,
            email: this.email_ctrl,
            firstname: this.firstname_ctrl,
            lastname: this.lastname_ctrl,
            password: this.password_ctrl,
            password2: this.password2_ctrl,
        });
        
    }

    createUser(){
        //console.log(this.createUserForm);
    }
}
