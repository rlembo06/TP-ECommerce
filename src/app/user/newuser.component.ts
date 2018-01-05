import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { TextEqualityValidatorModule } from "ngx-text-equality-validator";
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-newuser',
    templateUrl: './newuser.component.html',
    providers: [UserService]
})

export class NewuserComponent implements OnInit {

    public username_ctrl: FormControl;
    public email_ctrl: FormControl;
    public firstname_ctrl: FormControl;
    public lastname_ctrl: FormControl;
    public password_ctrl: FormControl;
    public confirmPassword_ctrl: FormControl;
    public createUserForm: FormGroup;

    constructor(
        private formBulder: FormBuilder,
        private userService : UserService
    ) { }

    ngOnInit() {

        this.username_ctrl = this.formBulder.control('', Validators.required);
        this.email_ctrl = this.formBulder.control('', Validators.required);
        this.firstname_ctrl = this.formBulder.control('', Validators.required);
        this.lastname_ctrl = this.formBulder.control('', Validators.required);
        this.password_ctrl = this.formBulder.control('', Validators.required)
        this.confirmPassword_ctrl = this.formBulder.control('', Validators.required)

        this.createUserForm = this.formBulder.group({
            username: this.username_ctrl,
            email: this.email_ctrl,
            firstname: this.firstname_ctrl,
            lastname: this.lastname_ctrl,
            password: this.password_ctrl,
            confirmPassword: this.confirmPassword_ctrl
        });

    }

    createUser(): void {
        this.userService.createUser(this.createUserForm.value);
        //if (result) alert("Profil ajouté !");
        //else alert("Echec de la création du profil !");
    }
}
