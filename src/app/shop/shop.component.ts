import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Category } from '../../class/category';
import { Product } from '../../class/product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    providers: [ShopService]
})

export class ShopComponent implements OnInit {

    public tokenPannier: any;
    public pannier: any;
    public productAdd: any;

    public products: Array<Product>;
    public categories: Array<Category>;
    public category: Category;

    constructor(
        private router: Router,
        private shopService: ShopService,
    ) {
        this.pannier = [];
        this.tokenPannier = JSON.parse(localStorage.getItem('tokenPannier'));
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

    onSelectOnPannier($event): void {
        // http://www.angulartodo.com/code.html

        let target = $event.target || $event.srcElement || $event.currentTarget;
        let idAttr = target.attributes.id;

        let libellePannier = target.attributes.name.value;
        let idPannier = idAttr.nodeValue;

        this.productAdd = {
            id: idPannier,
            libelle: libellePannier
        };

        if (this.tokenPannier == null) {
            localStorage.setItem('tokenPannier', JSON.stringify({}));
        }
        this.pannier.push(this.productAdd);

        localStorage.setItem('tokenPannier',
            JSON.stringify( this.pannier ));
    }

    onSelectCategory($event): void {
        let target = $event.target || $event.srcElement || $event.currentTarget;
        let idAttr = target.attributes.id;
        let id = idAttr.nodeValue;

        this.shopService.getProductsByCategory(id)
            .subscribe(result => {
                this.products = result;
            });
    }

    onSelectAllProducts(): void {
        this.shopService.getProducts()
            .subscribe(result => {
                this.products = result;
            });
    }

}
