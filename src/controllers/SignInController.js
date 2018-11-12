import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import { setAccountDetails } from '../store/actions/setAccount';
import { routes, pushTo } from '../helpers/router';
//import routes from '../utility/routes';
import PropTypes from 'prop-types';
import { Navigation } from "react-native-navigation";
import Icon from 'react-native-vector-icons/Ionicons';
import { setCustomerInfo } from '../helpers/storageManager';
let icons;
class SignInController extends Component {
    static navigatorStyle = {
        navBarButtonColor: "#888"
    };

    componentDidMount() {
        console.log("COMPONENT DID MOUNT")
        console.log(this.props)
        console.log("COMPONENT DID MOUNT")

    }
    
    constructor(props) {
        super(props);
        // Set icons to empty, this will avoid multiple push onto array
        icons = [];
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30, "red").then((source) => icons.push({
            id: "signInCont.done",
            //icon: source,
            text: "Done",
            color: "#aaaaaa"

        }))
    }

    openUrl = () => {
        Linking.openURL("http://www.google.com/");
    }

    showForm = () => {
        pushTo(routes.chat, this.props, icons);
        // setRoot(routes.chat)
        // Navigation.setRoot({
        // root: {
        //     stack: {
        //         children: [{
        //             component: {
        //                 name: routes.chat.key,
        //                 options: {
        //                         topBar: {
        //                             drawBehind: true,
        //                             animate: false,
        //                             visible: true,
        //                             navigatorStyle: { navBarHidden: true },
        //                             background: {
        //                                 color: '#36c4c0',
        //                             },
        //                         }
                                
        //                 }                        
        //             }
        //         }],
        //     }
        // }
        // });        
        // Navigation.push(this.props.componentId, {
        //     component: {
        //         name: routes.chat.key,
        //         options: {
        //             topBar: {
        //                 animate: false,
        //                 drawBehind: false,
        //                 borderHeight: 0,
        //                 elevation: 0, // TopBar elevation in dp                        
        //                 title: {
        //                     text: "Sign In!"
        //                 }
        //             }
        //         }
        //     }
        // });
    }

    onChangeTextHandler = (value, type, props) => {
        // props.setState(prev => {
        //     return {
        //         ...prev,
        //         name: value,
        //     };
        // });

        // this.setState(prev => {
        //     return {
        //         ...prev,
        //         name: value
        //     };
        // });
    }

    goPressHandler = (name, accountNumber) => {
        setCustomerInfo(name, accountNumber)
        .then(() => this.showForm() )
        .catch(error => {
            console.log(error)
            this.showForm()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name: </Text>
                    <TextInput style={styles.textBox} placeholder="Type here..." value={this.props.name} onChangeText={ (value) => this.props.onSetAccountDetails(value, this.props.accountNumber) }/>
                    <Text style={styles.label}>Account No.:</Text>
                    <TextInput style={styles.textBox} placeholder="Type here..." value={this.props.accountNumber} onChangeText={ (value) => this.props.onSetAccountDetails(this.props.name, value) } keyboardType="numeric"/>

                    <TouchableOpacity style={styles.actionButton} onPress={() => this.goPressHandler(this.props.name, this.props.accountNumber) }>
                        <Text style={styles.actionButtonText}>Go</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.externalLink} onPress={ () => this.openUrl() }>Forgot your account number?</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#68b8db"
    },
    formContainer: {
        flex: 1,
        justifyContent: "center"
    },
    label: {
        fontSize: 20,
        marginTop: 36,
        marginBottom: 6,
        color: "#ffffff",
        fontWeight: "bold"
    },
    textBox: {
        height: 40,
        width: 300,
        color: "#4ba3c9",
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: "#ffffff",
        paddingHorizontal: 5,
    },
    actionButton: {
        marginTop: 36,
        alignSelf: "flex-end",
        backgroundColor: "#cb3b27"
    },
    actionButtonText: {
        color: "#ffffff",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        marginVertical: 10,
        marginHorizontal: 20,
    },
    externalLink: {
        fontSize: 12,
        color: "#dfdfdf",
        textDecorationLine: "underline",
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 50,
    }
});

const mapStateToProps = (state) => {
    console.log(state)
    return {
        name: state.auth.name,
        accountNumber: state.auth.accountNumber
    };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onSetAccountDetails: (name, accountNumber) => dispatch(setAccountDetails(name, accountNumber))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInController);
// export default SignInController;