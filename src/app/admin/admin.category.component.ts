/*
 * https://www.npmjs.com/package/angular2-select-of
 */

import { Component, OnInit } from '@angular/core';
import { Category } from '../../class/category';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin.category.component.html',
  providers: [AdminService]
})
export class AdminCategoryComponent implements OnInit {

    public category: Category;
    public categories: Array<Category>;

    public id: number;
    public libelle: string;

    public libelleCreate_ctrl: FormControl;
    public createCategoryForm: FormGroup;

    public libelleUpdate_ctrl: FormControl;
    public updateCategoryForm: FormGroup;
    public categoriesUpdate: Array<IOption>;

    constructor(
        private formBulder: FormBuilder,
        private adminService: AdminService
    ) { }

    ngOnInit() {
        this.libelleCreate_ctrl = this.formBulder.control('', Validators.required);

        this.createCategoryForm = this.formBulder.group({
            libelle: this.libelleCreate_ctrl
        });

        this.adminService.getCategories()
            .subscribe(result => {
                this.categories = result;
                console.log(this.categories);

                this.categoriesUpdate = this.categories.map(function(category){
                    return {
                        label: category.libelle,
                        value: category.libelle
                    }
                });

            });

        this.updateCategoryForm = this.formBulder.group({
            libelle: new FormControl()
        });
    }

    createCategory() {
        console.log(this.createCategoryForm.value);
        this.category = this.createCategoryForm.value;

        this.adminService.createCategory(this.category)
            .subscribe(result => {
                alert(result);
            });
    }


}
