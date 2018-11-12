/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet } from 'react-native';
import { Navigation } from "react-native-navigation";
import { routes, setRoutes, registerAppLaunchedListener } from './src/helpers/router';
import { getCustomerInfo } from './src/helpers/storageManager';
const main = () => {
    let hydrateVars;
    setRoutes();
    getCustomerInfo()
    .then(data => {
      if (data.name && data.accountNumber) {
        hydrateVars = {
          rehydrateName: data.name,
          rehydrateAccount: data.accountNumber
        }
        return registerAppLaunchedListener(routes.chat, hydrateVars)
      } else {
        return registerAppLaunchedListener(routes.main, hydrateVars)
      }
      console.log("Storage Content: ", data)
    });

}

// const mapDispatchToProps = (dispatch) => {
//     return { 
//         onRehydrate: (name, accountNumber) => dispatch(rehydrateNameAndAccountNumber(name, accountNumber))
//     };
// }
// export default connect(null, mapDispatchToProps)(main);

export default main;
// export default class App extends React.Component {
//   render() {
    
//     console.log("Redux state => ", store.getState());
//     return <RootStack />;
//   }
// }

// Start App
// export default () => Navigation.startSingleScreenApp({
//   screen: {
//     screen: AUTH,
//     title: "Login"
//   }
// });

  // render() {
  //   return (
  //     <Navigator 
  //       initialRoute = {{name: "MainController", title: "Welcome"}}
  //       renderScene ={this._renderScene}
  //       style={styles.container}
  //       sceneStyle={styles.sceneContainer}

  //     />

  //   );
  // }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sceneContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "stretch"
//   }
// });

//export default App;