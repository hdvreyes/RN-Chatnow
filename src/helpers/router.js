import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Icon from 'react-native-vector-icons/Ionicons';

import MainController from '../controllers/MainController';
import SignInController from '../controllers/SignInController';
import ChatController from '../controllers/ChatController';

const store = configureStore();

export const routes = {
    main: { key: "com.now.Main", controller: MainController, title: "Main", withStore: false},
    signIn: { key: "com.now.SignIn", controller: SignInController, title: "Sign In", withStore: true},
    chat: { key: "com.now.Chat", controller: ChatController, title: "Start chatting", withStore: true}
}



// export default class Router {
//     static myInstance = null;
//     _userID = "";
//     /**
//      * @returns {Router}
//      */
//     static getInstance() {
        
//         if (Router.myInstance == null) {
//             Router.myInstance = new Router();
//             Router.myInstance.setRoutes();

//         }
//         return this.myInstance;
//     }

    // reduxStoreWrapper = (MyComponent, store) => {
    //     return () => {
    //         return class StoreWrapper extends React.Component {
    //             render () {
    //                 return (
    //                     <Provider store={store}>
    //                         <MyComponent />
    //                     </Provider>
    //                 );
    //             }
    //         };
    //     };
    // }

    export const setRoutes = () => {
        Object.keys(routes).map(key => {
            console.log(key)
            // let component = (routes[key].withStore === true) ? this.reduxStoreWrapper(routes[key].controller, store) : () => routes[key].controller;
        //   Navigation.registerComponent(routes[key].key, () => routes[key].controller, store, Provider);
            // Navigation.registerComponent(routes[key].key, component);
            Navigation.registerComponentWithRedux(routes[key].key, () => routes[key].controller, Provider, store);

        });

        // Navigation.registerComponent(routes.signIn.key, this.reduxStoreWrapper(routes.signIn.controller, store));
        // Navigation.registerComponent(routes.main.key, () => routes.main.controller);
        // Navigation.registerComponent(routes.chat.key, this.reduxStoreWrapper(routes.chat.controller, store));
    }
    
    export const registerAppLaunchedListener = (routeDetail, props) => {
        return Navigation.events().registerAppLaunchedListener(() => {
            return setRoot(routeDetail, props);
        });
    }

    export const pushTo = (routeDetail, props, icons?) => {
        // return true
        console.log("----------")

        // let icon = {(<Icon name="ios-person" size={30} color="#4F8EF7" />)}
        // console.log(routeDetail)

        // let g = []
        // Promise.all([
        //     // icon.push(name:{"hello"}, name: "we"})
        //     icon.map(key => {
        //         g.push(Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30))                
        //     })
        //     // icon.push(
        //     //     {
        //     //         name: "test",
        //     //         icon: "okay"
        //     //     }
        //     // )
        //     // return icon;
        //     // Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        //     // Icon.getImageSource(Platform.OS === 'android' ? "md-share-alt" : "ios-share", 30),
        //     // Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)

        // ]).then(sources => {
        //     console.log("ICON");
        //     //console.log(sources);
        //     let k = Object.keys(g)
        //     g[0].map(key => {
        //         console.log(key)

        //     })
        //     console.log("+++++++++++++")
        //     g.map(key => {
        //         console.log(key.Promise)
        //     })
            let icoObjs = []
            if (icons !== null && icons.length > 0) {
                // console.log(icons)
                icoObjs = icons.map(obj => { return obj })
            } else {
                icoObjs = []
            }                                

            Navigation.push(props.componentId, {
                component: {
                    name: routeDetail.key,
                    options: {
                        topBar: {
                            animate: false,
                            drawBehind: false,
                            borderHeight: 0,
                            elevation: 0, // TopBar elevation in dp                        
                            title: {
                                text: routeDetail.title
                            },
                            rightButtons: [
                                ...icoObjs,
                            ]
                        },
                        
                    }
                }
            });            
        // });

    }

    export const setRoot = (routeDetail, props) => {
        return Navigation.setRoot({
                            root: {
                                stack: {
                                    children: [{
                                        component: {
                                            name: routeDetail.key,
                                            options: {
                                                    topBar: {
                                                        drawBehind: true,
                                                        animate: false,
                                                        visible: true,
                                                        navigatorStyle: { navBarHidden: true },
                                                        background: {
                                                            color: '#36c4c0',
                                                        },
                                                    }
                                            },
                                            passProps: props                      
                                        }
                                    }],
                                }
                            }
        });  
    }
