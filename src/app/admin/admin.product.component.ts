/*
 * https://www.npmjs.com/package/angular2-select-of
 */

import { Component, OnInit } from '@angular/core';
import { Category } from '../../class/category';
import { Product } from '../../class/product';
import { FormControl, FormGroup, FormBuilder, Validators, Validator } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { SelectModule } from 'ng-select';
import { IOption } from 'ng-select';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin.product.component.html',
  providers: [AdminService]
})
export class AdminProductComponent implements OnInit {

    public product: Product;
    public products: Array<Product>;

    public category: Category;
    public categories: Array<Category>;

    public idUpdate: number;
    public libelleUpdate: string;

    public idDelete: number;
    public libelleDelete: string;

    public libelleCreate_ctrl: FormControl;
    public photoCreate_ctrl: FormControl;
    public descritionCreate_ctrl: FormControl;
    public priceCreate_ctrl: FormControl;
    public categoriesCreate: Array<IOption>;
    public createProductForm: FormGroup;

    public idUpdate_ctrl: FormControl;
    public libelleUpdate_ctrl: FormControl;
    public updateProductForm: FormGroup;
    public categoriesUpdate: Array<IOption>;

    public idDelete_ctrl: FormControl;
    public libelleDelete_ctrl: FormControl;
    public deleteProductForm: FormGroup;
    public categoriesDelete: Array<IOption>;

    constructor(
        private router: Router,
        private formBulder: FormBuilder,
        private adminService: AdminService
    ) { }

    ngOnInit() {
        this.libelleCreate_ctrl = this.formBulder.control('', Validators.required);
        this.photoCreate_ctrl = this.formBulder.control('', Validators.required);
        this.descritionCreate_ctrl = this.formBulder.control('', Validators.required);
        this.priceCreate_ctrl = this.formBulder.control('', Validators.required);

        this.createProductForm = this.formBulder.group({
            libelle: this.libelleCreate_ctrl,
            photo: this.photoCreate_ctrl,
            descrition: this.descritionCreate_ctrl,
            price: this.priceCreate_ctrl
        });

        this.adminService.getCategories()
            .subscribe(result => {
                this.categories = result;

                this.categoriesCreate = this.categories.map(function(category){
                    let categroyId = String(category.id);
                    return {
                        label: category.libelle,
                        value: categroyId
                    }
                });

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

        this.deleteProductForm = this.formBulder.group({
            libelle: this.libelleDelete,
            id: this.idDelete
        });

        this.updateProductForm = this.formBulder.group({
            libelle: this.libelleUpdate,
            id: this.idUpdate
        });
    }

    createProduct() {
        console.log(this.createProductForm.value);
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

    updateProduct() {

        console.log(this.updateProductForm.value);
    }

    deleteProduct() {

        console.log(this.deleteProductForm.value);
    }


}