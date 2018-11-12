import { SET_ACCOUNT, REHYDRATE_CUSTOMER_DETAILS } from '../actions/actionTypes';

const initialState = {
    name: "",
    accountNumber: ""
}

const reducer = (state = initialState, action) => {
    console.log("REDUCERS!")
    switch(action.type) {
        case SET_ACCOUNT:
        case REHYDRATE_CUSTOMER_DETAILS:
            return {
                ...state,
                name: action.name,
                accountNumber: action.accountNumber
            }
        default:
            return state;
    }
}
export default reducer;