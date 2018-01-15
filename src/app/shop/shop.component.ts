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

    public products: Array<Product>;

    constructor(
        private shopService: ShopService
    ) {}

    ngOnInit() {
        this.shopService.getProducts()
            .subscribe(result => {
                this.products = result;
                console.log(this.products);
            });  
    }

}
