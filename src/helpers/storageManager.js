import React from 'react';
import { AsyncStorage} from 'react-native';

const storageNameKey = "@chatNow:name";
const storageAccountNumKey = "@chatNow:accountNum";

export const setCustomerInfo = (name, accountNumber) => {
    return AsyncStorage.multiSet([
        [storageNameKey, name],
        [storageAccountNumKey, accountNumber]
    ]);
}

export const getCustomerInfo = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.multiGet([
            storageNameKey, 
            storageAccountNumKey
        ])
        .then(result => resolve({
            name: result[0][1],
            accountNumber: result[1][1]
        }))
        .catch(err => reject(err))
    });
}

export const clearCustomerInfo = () => {
    AsyncStorage.clear();
}

window.safelyClearStorage = clearCustomerInfo;