import React from 'react';
import AnimeList from "../../components/AnimeList/index";
import ComicatManager from "../../comicat/ComicatManager";
import {BackHandler, NativeModules, ToastAndroid, View} from "react-native";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import {toolBarStyle} from "./styles";
import {Toolbar} from "react-native-material-ui";


type Props = {
    navigation: NavigationScreenProp<NavigationState>,
}
const LOGOUT_TIME = 2000;

class Home extends React.Component<Props> {

    render() {
        return <View style={{flex: 1}}>
            <Toolbar
                leftElement="home"
                centerElement="动漫下载"
                searchable={{
                    autoFocus: true,
                    placeholder: '搜索',
                    onChangeText: this.setText,
                    onSubmitEditing: this.search
                }}
                style={toolBarStyle}

            />
            <AnimeList navigation={this.props.navigation} animeManager={new ComicatManager()}/>
        </View>
    }

    componentDidMount() {
        this.willFocus = this.props.navigation.addListener('willFocus', () => {
            // console.log('willFocus');
            BackHandler.addEventListener('hardwareBackPress', this._backListener);
        });
        this.willBlur = this.props.navigation.addListener('willBlur', () => {
            // console.log('willBlur');
            BackHandler.removeEventListener('hardwareBackPress', this._backListener);
        })
    }

    componentWillUnmount() {
        if (this.willBlur) {
            this.willBlur.remove();
        }
        if (this.willFocus) {
            this.willFocus.remove();
        }
    }

    text: string;
    lastBackPressed;
    willFocus;
    willBlur;
    setText = (text) => {
        this.text = text;
    };
    search = () => {
        if (this.text) {
            this.props.navigation.navigate('Search', {keyword: this.text});
        }
    };

    _backListener = () => {
        if (this.lastBackPressed && this.lastBackPressed + LOGOUT_TIME >= Date.now()) {
            NativeModules.TzSystem.exit();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        return true;
    };
}


export default Home;