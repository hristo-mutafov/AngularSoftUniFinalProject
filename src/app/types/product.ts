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
    category: string;
    in_favorites?: boolean;
}

export type IProductList = IProduct[];

export type IFavoritesList = [{ products: IProduct[] }];
