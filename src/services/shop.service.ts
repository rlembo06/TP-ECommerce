import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../class/category';
import { Product } from '../class/product';

@Injectable()
export class ShopService {

    private uri: string;
    //public articles = Observable.of(null);
    public tokenPannier: any;
    public pannier: any;

    constructor(
        private http: Http
    )
    {
        this.pannier = [];
        this.uri = "http://localhost:3000/shop";
        this.tokenPannier = JSON.parse(localStorage.getItem('tokenPannier'));
    }

    getProducts(): Observable<Array<Product>> {

        return this.http.get(this.uri + "/product/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    getCategories(): Observable<Array<Category>> {

        return this.http.get(this.uri + "/category/all")
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    getCategory(category: Category): Observable<Category> {

        return this.http.get(this.uri + "/category/" + category.id)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    getProductsByCategory(id): Observable<Array<Product>> {

        return this.http.get(this.uri + "/category/products/" + id)
            .map((response: Response) => {
                let result = response.text();
                return JSON.parse(result);
            });
    }

    /*
    setArticles(): Observable<number> {

        return this.articles.map(() => {
            if (this.tokenPannier !== null) return this.tokenPannier.length;
            else return null;
        });
    }
    */

    setArticles(): number {
        if (this.tokenPannier !== null) return this.tokenPannier.length;
        else return null;
    }
}
