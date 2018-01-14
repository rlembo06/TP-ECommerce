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

    public uploaderCreate: any;
    public uploaderUpdate: any;

    public product: Product;
    public products: Array<Product>;

    public category: Category;
    public categories: Array<Category>;

    public idCreate: number;
    public idCategoryCreate: number;
    public libelleCreate: string;

    public idUpdate: number;
    public idCategoryUpdate: number;
    public libelleUpdate: string;

    public idDelete: number;
    public libelleDelete: string;

    public libelleCreate_ctrl: FormControl;
    public descriptionCreate_ctrl: FormControl;
    public priceCreate_ctrl: FormControl;
    public categoriesCreate: Array<IOption>;
    public createProductForm: FormGroup;

    public idUpdate_ctrl: FormControl;
    public libelleUpdate_ctrl: FormControl;
    public descriptionUpdate_ctrl: FormControl;
    public priceUpdate_ctrl: FormControl;
    public categoriesUpdate: Array<IOption>;
    public productsUpdate: Array<IOption>;
    public updateProductForm: FormGroup;

    public idDelete_ctrl: FormControl;
    public libelleDelete_ctrl: FormControl;
    public deleteProductForm: FormGroup;
    public productsDelete: Array<IOption>;

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
        });

        this.idUpdate_ctrl = this.formBulder.control('');
        this.libelleUpdate_ctrl = this.formBulder.control('');
        this.descriptionUpdate_ctrl = this.formBulder.control('');
        this.priceUpdate_ctrl = this.formBulder.control('');

        this.updateProductForm = this.formBulder.group({
            id: this.idUpdate_ctrl,
            libelle: this.libelleUpdate_ctrl,
            description: this.descriptionUpdate_ctrl,
            price: this.priceUpdate_ctrl,
            id_category: null
        });

        this.deleteProductForm = this.formBulder.group({
            libelle: this.libelleDelete,
            id: this.idDelete
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

            });  
            
        this.adminService.getProducts()
            .subscribe(result => {
                this.products = result;

                this.productsUpdate = this.products.map(function(product){
                    let productId = String(product.id);
                    return {
                        label: product.libelle,
                        value: productId
                    }
                });

                this.productsDelete = this.products.map(function(product){
                    let productId = String(product.id);
                    return {
                        label: product.libelle,
                        value: productId
                    }
                });

            });  
            
    }

    createProduct() {
        this.product = this.createProductForm.value;
        this.product.photo = this.uploaderCreate;
        this.product.id_category = this.idCategoryCreate;
        
        this.adminService.createProduct(this.product)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }

    updateProduct() {
        this.product = this.updateProductForm.value;
        this.product.photo = this.uploaderUpdate;
        this.product.id_category = this.idCategoryUpdate != null || this.idCategoryUpdate != undefined ? this.idCategoryCreate : 0;

        console.log(this.product);
        
        this.adminService.updateProduct(this.product)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
        
    }

    deleteProduct() {
        console.log(this.product.id);

        this.adminService.deleteProduct(this.product)
            .subscribe(result => {
                alert(result);
                location.reload(true);
            });
    }

    handleUploaderCreate($event) : void {
        this.handleDataURICreate($event.target);
    }
     
    cancelPhotoCreate($event) : void {
        this.uploaderCreate = null;
    }

    handleDataURICreate(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
      
        myReader.onloadend = (e) => {
            this.uploaderCreate = myReader.result;
        }
        myReader.readAsDataURL(file);
    }

    handleUploaderUpdate($event) : void {
        this.handleDataURIUpdate($event.target);
    }
     
    cancelPhotoUpdate($event) : void {
        this.uploaderUpdate = null;
    }

    handleDataURIUpdate(inputValue: any): void {
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
      
        myReader.onloadend = (e) => {
            this.uploaderUpdate = myReader.result;
        }
        myReader.readAsDataURL(file);
    }

    onSelectedUpdate(option: IOption) {
        this.idUpdate = +option.value;
        this.product = new Product(this.idUpdate, null, null, null, null, null);
        
        this.adminService.getProduct(this.product)
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

    onSelectedDelete(option: IOption) {
        this.idDelete = +option.value;
        this.product = new Product(this.idDelete, null, null, null, null, null);
    }

    onSelectedCategoryCreate(option: IOption) {
        this.idCategoryCreate = +option.value;
    }

    onSelectedCategoryUpdate(option: IOption) {
        this.idCategoryUpdate = +option.value;
    }

}
