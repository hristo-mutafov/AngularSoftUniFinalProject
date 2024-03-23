export interface IAuthResponse {
    access_token: string;
    refresh_token: string;
    is_staff: boolean;
}

export interface IRefreshTokenResponse {
    access: string;
}

export interface IProfile {
    email: string;
    is_staff: boolean;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    phone_number: string;
}

export interface IProfileState {
    email?: string;
    isStaff: boolean;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
}

export interface IUpdateProfileData {
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    gender?: string;
}
