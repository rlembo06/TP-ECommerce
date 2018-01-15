import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Category } from '../../class/category';
import { Product } from '../../class/product';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css'],
    providers: [ShopService]
})

export class ShopComponent implements OnInit {

    public tokenPannier: any;
    public products: Array<Product>;
    public categories: Array<Category>;
    public category : Category;

    constructor(
        private shopService: ShopService
    ) {
        this.tokenPannier = localStorage.getItem('tokenPannier');
        console.log(this.tokenPannier);
    }

    ngOnInit() {
        this.shopService.getProducts()
            .subscribe(result => {
                this.products = result;
            });  

            this.shopService.getCategories()
            .subscribe(result => {
                this.categories = result;
            });  
    }

    onSelectOnPannier($event) : void {
        let target = $event.target || $event.srcElement || $event.currentTarget;
        let idAttr = target.attributes.id;
        let id = idAttr.nodeValue;
        console.log(id);

        if(this.tokenPannier == null){
            //localStorage.setItem('tokenPannier', JSON.stringify([]));
            localStorage.setItem('tokenPannier', JSON.stringify({}));
            this.tokenPannier = localStorage.getItem('tokenPannier');
        } 
        JSON.parse(this.tokenPannier).push(id);
        console.log(this.tokenPannier);
    }

    onSelectCategory($event) : void {
        let target = $event.target || $event.srcElement || $event.currentTarget;
        let idAttr = target.attributes.id;
        let id = idAttr.nodeValue;

        this.shopService.getProductsByCategory(id)
            .subscribe(result => {
                this.products = result;
            }); 
    }

    onSelectAllProducts() : void {
        this.shopService.getProducts()
            .subscribe(result => {
                this.products = result;
            }); 
    }

}
