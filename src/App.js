/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigation from "./routes/Navigation";
import SplashScreen from 'react-native-splash-screen';
export default class App extends Component {
    componentDidMount() {
        // new ComicatManager().getDetails('2a067cdc6732d7e6f7ae8a3dc30209aa11c62b57').then((result) => {
        //     console.log(result)
        // })
        SplashScreen.hide();
    }
    render() {
        return (<View style={styles.container}>
                <Navigation />
            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
