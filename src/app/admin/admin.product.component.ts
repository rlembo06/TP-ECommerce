/*
 * https://www.npmjs.com/package/angular2-select-of
 * https://valor-software.com/ng2-file-upload/
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

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin.product.component.html',
  providers: [AdminService]
})
export class AdminProductComponent implements OnInit {

    public uploader: any;

    public product: Product;
    public products: Array<Product>;

    public category: Category;
    public categories: Array<Category>;

    public idCategoryCreate: number;

    public idUpdate: number;
    public idCategoryUpdate: number;
    public libelleUpdate: string;

    public idDelete: number;
    public idCategoryDelete: number;
    public libelleDelete: string;

    public libelleCreate_ctrl: FormControl;
    public photoCreate_ctrl: FormControl;
    public descriptionCreate_ctrl: FormControl;
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
        this.libelleCreate_ctrl = this.formBulder.control('');
        this.descriptionCreate_ctrl = this.formBulder.control('');
        this.priceCreate_ctrl = this.formBulder.control('');

        this.createProductForm = this.formBulder.group({
            libelle: this.libelleCreate_ctrl,
            description: this.descriptionCreate_ctrl,
            price: this.priceCreate_ctrl,
            id_category: ''
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
        this.product = this.createProductForm.value;
        this.product.photo = this.uploader;
        this.product.id_category = this.idCategoryCreate;
        
        this.adminService.createProduct(this.product)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }

    handleUploader($event) : void {
        this.handleDataURI($event.target);
    }
     
    cancelPhoto($event) : void {
        this.uploader = null;
    }

    handleDataURI(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
      
        myReader.onloadend = (e) => {
            this.uploader = myReader.result;
            //console.log(this.uploader);
        }
        myReader.readAsDataURL(file);
    }

    onSelectedCategoryCreate(option: IOption) {
        this.idCategoryCreate = +option.value;
    }

    onSelectedCategoryUpdate(option: IOption) {
        this.idCategoryUpdate = +option.value;
    }

    updateProduct() {

        console.log(this.updateProductForm.value);
    }

    deleteProduct() {

        console.log(this.deleteProductForm.value);
    }


}
