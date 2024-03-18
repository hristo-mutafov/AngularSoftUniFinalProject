interface IProduct {
    id: number;
    image: string;
    name: string;
    price: string;
    added_on: string;
    in_favorites?: boolean;
}

export type IProductList = IProduct[];
