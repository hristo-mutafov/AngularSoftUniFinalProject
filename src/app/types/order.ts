interface IOrder {
    order_number: string;
    date: string;
    price: string;
    order_number_short: string;
}

export type DeliveryMethod = 'dhl_delivery' | 'fast_dhl' | 'to_address';

export interface IUserInformation {
    names: string;
    phoneNumber: string;
    address: string;
}

export type IOrderList = IOrder[];

export interface IOrderDetail {
    order_number: string;
    date: string;
    address: string;
    payment_method: string;
    price: string;
    comment?: string;
}
