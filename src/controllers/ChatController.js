import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { updateComposeMessage, sendMessage, receivedMessage, fetchMessage } from '../store/actions/composingMessage';

import MessageBubble from '../components/MessageBubble';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { composingMessage } from '../store/reducers/message';
import { Navigation } from "react-native-navigation";
import { rehydrateNameAndAccountNumber } from '../store/actions/setAccount';

let apiPollIntervalId;

class ChatScreen extends Component {

  constructor(props) {
    super(props);
    // this.fetchResponse = this.fetchResponse.bind(this)
     Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
      console.log(buttonId)
      if (buttonId === "signInCont.done") {
          Navigation.popToRoot(this.props.componentId);
      }
  }

  onTextChangeHandler = (value) => {
      this.setState(prev => {
          return {
              ...prev,
              message: value
          };
      });
  }

  onSubmitHandler = () => {
    if (this.state.message.trim() !== "") {
        this.props.onComposeMessageUpdate(this.state.message);
        this.props.onSendMessage();
        this.reset();
    } else {
        alert("You can't submit and empty message!");
    }
  }
  
  reset = () => {
    this.setState({
        message: ""
    });
  }

  componentDidMount() {
    console.log("-xxxxxxxxxxx-")
    console.log(this.props)
    this.props.onRehydrate(this.props.rehydrateName, this.props.rehydrateAccount)
    apiPollIntervalId = setInterval(this.fetch, 5000)
  }

  componentWillMount() {
    this.reset();
  }
  componentWillUnmount() {
    //clearInterval(apiPollInternalId);
  }

 fetch = () => {
    this.props.onFetchMessage()
 }
//   fetchResponse = () => {
//       fetch('http://10.0.1.107:8080/messages')
//       .then(response => response.json())
//       .then(data => {
//           if (data && data.message) {
//               this.props.onReceivedMessage(data);
//           }
//       })
//   }
  
  render() {
    // this.fetchResponse()
    let spacer = Platform.OS === 'ios' ? <KeyboardSpacer /> : null;

    // const messages = [
    //     { isOwnMessage: false, message: 'Hi, I\'m a mouse. How can I help you?' },
    //     { isOwnMessage: true, message: 'An upgrade on current service' },
    //     { isOwnMessage: false, message: 'I can help you, with that!' }
    // ];
  
    const bubbles = this.props.messages.map((m, i) => <MessageBubble { ...m } key={ i } /> );
    let scrollWindow;
    return (
            <View behavior="padding" style={styles.container}>
                <SafeAreaView style={{flex: 1, backgroundColor: '#eeeeee'}}>
                    <View style={styles.container}>
                        <ScrollView style={styles.bubbleContainer}
                        ref={scrollview => {scrollWindow = scrollview}}
                        onContentSizeChange={(width, height) => {
                                scrollWindow.scrollToEnd({animated:true})
                        }} >
                            {bubbles}
                        </ScrollView>
                        <View style={styles.messageBoxContainer}>
                            <TextInput style={styles.messageBox} 
                                        value={this.state.message} 
                                        onChangeText={ (value) => this.onTextChangeHandler(value)} 
                                        onSubmitEditing={() => this.onSubmitHandler()} 
                                        returnKeyType="send" />
                            <TouchableOpacity onPress={ () => this.onSubmitHandler() }>
                                <Text style={styles.sendButton}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>    
                {spacer}
            </View>
    );
  }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    bubbleContainer: {
        flex: 1
    },
    messageBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#dddddd",
        backgroundColor: "#eeeeee",
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    messageBox: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#dddddd",
        backgroundColor: "#ffffff",
        paddingHorizontal: 5
    },
    sendButton: {
        color: "blue",
        marginLeft: 10,
        marginRight: 5,
        fontSize: 16,
        fontWeight: "500"
    }

});

const mapStateToProps = (state) => {
    return {
        messages: state.messages.messages,
        composingMessage: state.composingMessage.message
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onComposeMessageUpdate: (message) => dispatch(updateComposeMessage(message)),
        onSendMessage: () => dispatch(sendMessage(new Date())),
        onReceivedMessage: (message) => dispatch(receivedMessage(message)),
        onFetchMessage: () => dispatch(fetchMessage()),
        onRehydrate: (name, accountNumber) => dispatch(rehydrateNameAndAccountNumber(name, accountNumber))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
