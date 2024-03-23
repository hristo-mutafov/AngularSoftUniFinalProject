import { IProductDetail } from './product';

interface ICart {
    product: IProductDetail;
    count: number;
}

export type IGetCartResponse = ICart[];
