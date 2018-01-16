export class Product {
    public id: number;
    public libelle: string;
    public photo: any;
    public description: string;
    public price: number;
    public id_category: number;

    constructor(
        id: number,
        libelle: string,
        photo: any,
        description: string,
        price: number,
        id_category: number
    ) {
        this.id = id;
        this.libelle = libelle;
        this.photo = photo;
        this.description = description;
        this.price = price;
        this.id_category = id_category;
    }
}
