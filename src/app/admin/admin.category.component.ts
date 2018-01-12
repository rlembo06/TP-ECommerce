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
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin.category.component.html',
  providers: [AdminService]
})
export class AdminCategoryComponent implements OnInit {

    public category: Category;
    public categories: Array<Category>;

    public idUpdate: number;
    public libelleUpdate: string;

    public idDelete: number;
    public libelleDelete: string;

    public libelleCreate_ctrl: FormControl;
    public createCategoryForm: FormGroup;

    public idUpdate_ctrl: FormControl;
    public libelleUpdate_ctrl: FormControl;
    public updateCategoryForm: FormGroup;
    public categoriesUpdate: Array<IOption>;

    public idDelete_ctrl: FormControl;
    public libelleDelete_ctrl: FormControl;
    public deleteCategoryForm: FormGroup;
    public categoriesDelete: Array<IOption>;

    constructor(
        private router: Router,
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

                this.categoriesUpdate = this.categories.map(function(category){
                    let categroyId = String(category.id);
                    return {
                        label: category.libelle,
                        value: categroyId
                    }
                });

                this.categoriesDelete = this.categories.map(function(category){
                    let categroyId = String(category.id);
                    return {
                        label: category.libelle,
                        value: categroyId
                    }
                });

            });

        this.deleteCategoryForm = this.formBulder.group({
            libelle: this.libelleDelete,
            id: this.idDelete
        });

        this.updateCategoryForm = this.formBulder.group({
            libelle: this.libelleUpdate,
            id: this.idUpdate
        });
    }

    createCategory() {
        console.log(this.createCategoryForm.value);
        this.category = this.createCategoryForm.value;

        this.adminService.createCategory(this.category)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }

    onSelectedUpdate(option: IOption) {
        this.libelleUpdate_ctrl = this.formBulder.control(option.label);
        this.libelleUpdate = option.label;

        this.idUpdate_ctrl = this.formBulder.control(option.value);
        this.idUpdate = +option.value;
    }

    onSelectedDelete(option: IOption) {
        this.libelleDelete_ctrl = this.formBulder.control(option.label);
        this.libelleDelete = option.label;

        this.idDelete_ctrl = this.formBulder.control(option.value);
        this.idDelete = +option.value;

        console.log('onSelectedDelete :', option);
    }

    updateCategory() {

        console.log(this.updateCategoryForm.value);

        this.adminService.updateCategory(this.updateCategoryForm.value)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }

    deleteCategory() {

        console.log(this.deleteCategoryForm.value);

        this.adminService.deleteCategory(this.deleteCategoryForm.value)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }


}
