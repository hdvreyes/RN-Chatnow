import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = (props) => {
    return (<View style={[styles.bubble, props.isOwnMessage && styles.ownBubble]}>
        <Text style={[styles.messageText, props.isOwnMessage && styles.ownMessageText]}>
            {props.message}
        </Text>
    </View>);
}
const styles = StyleSheet.create({
    bubble: {
        width: 250,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#ececec",
        borderRadius: 10
    },
    ownBubble: {
        backgroundColor: "#457de5ff",
        alignSelf: "flex-end"

    },
    messageText: {
        color: "#333333",
    },
    ownMessageText: {
        color: "#ffffff"
    }

});

export default MessageBubble;