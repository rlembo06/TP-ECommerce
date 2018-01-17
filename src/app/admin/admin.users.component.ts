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
        let idUpdate = +option.value;
        this.user = new User(idUpdate, null, null, null, null, null, null, null, null, null);

        this.adminService.getProduct(this.user)
            .subscribe(result => {
                this.product = result;

                this.updateProductForm = this.formBulder.group({
                    id: this.product.id,
                    libelle: this.product.libelle,
                    description: this.product.description,
                    price: this.product.price,
                    id_category: String(this.product.id_category)
                });

                //console.log( this.product.photo );
                this.uploaderUpdate = this.product.photo ;
            });
    }

    onSelectedDelete($event){

    }

    updateUser(){

    }

    deleteUser(){

    }

}
