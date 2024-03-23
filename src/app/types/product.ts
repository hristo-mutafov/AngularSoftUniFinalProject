export interface IProduct {
    id: number;
    image: string;
    name: string;
    price: string;
    added_on: string;
    in_favorites?: boolean;
}

export interface IProductDetail {
    id: number;
    image: string;
    name: string;
    description: string;
    quantity: 23;
    brand: string;
    made_in: string;
    price: string;
    added_on: string;
    category: 'T-Shirt' | 'Shorts' | 'Shoes';
    in_favorites?: boolean;
}

export type IProductList = IProduct[];

export type IFavoritesList = [{ products: IProduct[] }];

export interface IProductCreate {
    key: string;
    name: string;
    description: string;
    quantity: number;
    made_in: string;
    price: number;
    category: number;
    brand: string;
    extension: string;
    image: string;
}
