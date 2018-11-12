import { UPDATE_COMPOSE_MESSAGE, SEND_MESSAGE, RECEIVED_MESSAGE } from '../actions/actionTypes';

const initialState = {
    message: "",
    messages: []
}
const messagesState = {
}
export const composingMessage = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_COMPOSE_MESSAGE:
            return {
                ...state,
                message: action.message
            }
        case SEND_MESSAGE:
            return {
                ...state,
                message: ""
            }
        default: 
            return state;
    }
}


export const messages = (state = initialState, action) => {

    switch(action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,
                            { message: action.message, timestamp: action.timestamp, isOwnMessage: true }]
            }
            // return [
            //     ...state,
            //     { message: action.message, timestamp: action.timestamp, isOwnMessage: true },
            // ]
            // return {
            //     messages: [{ message: action.timestamp, timestamp: "ss", isOwnMessage: true }]
            // }
        case RECEIVED_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.message]
            }
        default:
            return state
    }
}
