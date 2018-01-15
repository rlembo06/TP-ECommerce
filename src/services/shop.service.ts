import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../class/category';
import { Product } from '../class/product';

@Injectable()
export class ShopService {

    private uri: string;

    constructor(
        private http: Http
    )
    {
		this.uri = "http://localhost:3000/shop";
    }


    getProducts(): Observable<Array<Product>> {

        return this.http.get(this.uri + "/product/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }
}
