export type DeliveryMethod = 'dhl_delivery' | 'fast_dhl' | 'to_address';

export interface IUserInformation {
    names: string;
    phoneNumber: string;
    address: string;
}
