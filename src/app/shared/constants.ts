export const emailRegEx = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
);

export const ERROR_RETRY_TIMES = 3;
export const AUTHENTICATION_400 = 'Incorrect Email or Password';
export const SERVER_ERROR_500 = 'Server Error. Try again later';
export const SAME_EMAIL = 'Type different email than the current one!';
export const FIELDS_ARE_REQUIRED = 'All fields are required!';
export const PASSWORD_NOT_MATCH = 'Passwords do not match!';
export const BLANK_FIELD_MESSAGE = 'Field not filled';
export const ORDER_400_ERROR = 'Missing fields!';
export const NOT_CORRECT_FILLED_FILEDS =
    'The fields may not be filled correctly!';
