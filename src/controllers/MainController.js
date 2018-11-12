import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation } from "react-native-navigation";
// import routes from '../utility/routes';
import { connect } from 'react-redux';

import { routes, pushTo } from "../helpers/router";
import { rehydrateNameAndAccountNumber } from '../store/actions/setAccount';

// let g = Router();
class MainController extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("COMPONENT DID MOUNT")
        console.log(this.props.rehydrateName)
        console.log(this.props.rehydrateAccount)
        console.log("COMPONENT DID MOUNT")


        //this.props.onRehydrate(this.props.rehydrateName, this.props.rehydrateAccount)
    }

    showForm = () => {
        console.log("+++++++++++")
        console.log(routes.signIn)
        pushTo(routes.signIn, this.props, null);
        // router.pushTo(router.routes.signIn.key, this.props)
        // Navigation.push(this.props.componentId, {
        //     component: {
        //         name: routes.signIn.key,
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
        //         },
        //         passProps: {
        //             props: this.props
        //         }
        //     }
        // });
    }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}> AwesomeCo Support </Text>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={ () => {
                this.showForm()
            }}>
                <Text style={styles.buttonText}>
                    Get Help
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#36c4c0"
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    buttonContainer: {
        flex: 2,
        justifyContent: "center"
    },
    button: {
        width: 300,
        height: 300,
        justifyContent: "center",
        borderRadius: 150,
        borderWidth: 10,
        borderColor: "#8e3429",
        backgroundColor: "#cb3b27",
        padding: 30,
        elevation: 5,
        shadowColor: "#cb3b27",
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.6
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 60,
        fontWeight: "200",
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0)"
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
        onRehydrate: (name, accountNumber) => dispatch(rehydrateNameAndAccountNumber(name, accountNumber))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainController);

// export default  MainController;