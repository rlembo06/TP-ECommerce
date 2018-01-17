/*
 * https://www.npmjs.com/package/angular2-select-of
 */

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../services/user.service';
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { User } from '../../class/user';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin.users.component.html',
  providers: [AdminService, UserService]
})
export class AdminUsersComponent implements OnInit {

    public user: User;
    public users: Array<User>;

    public usersOptionsUpdate: Array<IOption>;
    public updateUserForm: FormGroup;

    public usersOptionsDelete: Array<IOption>;
    public deleteUserForm: FormGroup;

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private adminService: AdminService,
        private userService: UserService
    ) { }

    ngOnInit() {

        this.updateUserForm = this.formBulder.group({
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            city: '',
            street: '',
            cp: '',
            country: ''
        });


        this.deleteUserForm = this.formBulder.group({
            id: ''
        });

        this.adminService.getUsers()
            .subscribe(result => {
                this.users = result;
                console.log(this.users);

                this.usersOptionsUpdate = this.users.map(function(user){
                    let userId = String(user.id);
                    return {
                        label: user.username,
                        value: userId
                    };
                });

                this.usersOptionsDelete = this.users.map(function(user){
                    let userId = String(user.id);
                    return {
                        label: user.username,
                        value: userId
                    };
                });

            });
    }

    onSelectedUpdate(option: IOption) {
        let id = +option.value;

        this.adminService.getUserById(id)
            .subscribe(result => {
                this.user = result;

                this.updateUserForm = this.formBulder.group({
                    id: this.user.id,
                    username: this.user.username,
                    email: this.user.email,
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    city: this.user.city,
                    street: this.user.street,
                    cp: this.user.cp,
                    country: this.user.country
                });
            });
    }

    onSelectedDelete($event){

    }

    updateUser(){

    }

    deleteUser(){

    }

}
