import { SET_ACCOUNT, REHYDRATE_CUSTOMER_DETAILS } from './actionTypes';

export const setAccountDetails = (name, accountNumber) => {
    return {
        type: SET_ACCOUNT,
        name: name,
        accountNumber: accountNumber
    };
};

export const rehydrateNameAndAccountNumber = (name, accountNumber) => {
    return {
        type: REHYDRATE_CUSTOMER_DETAILS,
        name: name,
        accountNumber: accountNumber
    }
}