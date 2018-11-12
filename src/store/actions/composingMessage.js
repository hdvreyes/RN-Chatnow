import { UPDATE_COMPOSE_MESSAGE, SEND_MESSAGE, RECEIVED_MESSAGE, FETCH_MESSAGE } from './actionTypes'
//import { composingMessage } from '../reducers/message';
//import { receivedMessage } from './composingMessage';
export const updateComposeMessage = (message) => {
    return {
        type: UPDATE_COMPOSE_MESSAGE,
        message: message,
    };
};

export const sendMessage = (timestamp) => {
    return (dispatch, getState) => {

        const message = {
            message: getState().composingMessage.message,
            timestamp: timestamp,
            customerName: getState().auth.name,
            accountNumber: getState().auth.accountNumber
        }
        dispatch({
            type: SEND_MESSAGE,
            ...message
        })

        fetch('http://10.0.1.107:8080/messages', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(message)
        }).catch(err => console.log(err))
        

    }
}

export const receivedMessage = (message) => {
    return {
        type: RECEIVED_MESSAGE,
        message: message
    }
}

export const fetchMessage = () => {
    return (dispatch) => {
      fetch('http://10.0.1.107:8080/messages')
      .then(response => response.json())
      .then(data => {
          if (data && data.message) {
              dispatch(receivedMessage(data))
          }
      })
    }
}
