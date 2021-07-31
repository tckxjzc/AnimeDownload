import React, { Component } from 'react';
import { Linking, ProgressBarAndroid, ToastAndroid, View, Clipboard, WebView, } from 'react-native';
import { actionButtonStyle, styles, toolBarStyle, copyActionButtonStyle } from "./styles";
import getTemplate from "./getTemplate";
import injectedJavaScript from "./injectedJavaScript";
import THEME from "../../values/THEME";
import ComicatManager from "../../comicat/ComicatManager";
import { ActionButton, Toolbar } from "react-native-material-ui";
class Details extends Component {
    constructor(props) {
        super(props);
        /**
         * lifecycle
         */
        this.mounted = false;
        this.state = {
            anime: null,
        };
        this.animeManager = new ComicatManager();
        /**
         *method
         */
        this.download = () => {
            let link = `magnet:?xt=urn:btih:${this.anime.torrent}`;
            Linking.canOpenURL(link).then((supported) => {
                if (supported) {
                    Linking.openURL(link);
                }
                else {
                    Clipboard.setString(link);
                    ToastAndroid.show('未安装bt下载工具,已经复制下载链接到剪贴板', ToastAndroid.LONG);
                }
            });
        };
        this.copy = () => {
            let link = `magnet:?xt=urn:btih:${this.anime.torrent}`;
            Clipboard.setString(link);
            ToastAndroid.show('已经复制下载链接到剪贴板', ToastAndroid.LONG);
        };
        this.goBack = () => {
            this.props.navigation.goBack();
        };
        this.onMessage = (e) => {
            Linking.openURL(e.nativeEvent.data).catch(err => console.error('An error occurred', err));
        };
        this.anime = props.navigation.getParam('anime');
    }
    componentDidMount() {
        this.mounted = true;
        this.animeManager.getDetails(this.anime.id).then((result) => {
            if (this.mounted) {
                this.setState({ anime: Object.assign({}, this.anime, { details: result.details }) });
            }
        });
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    componentWillMount() {
    }
    render() {
        let containerView;
        if (this.state.anime) {
            containerView = <View style={styles.container}>
                <WebView onMessage={this.onMessage} injectedJavaScript={injectedJavaScript} scrollEnabled={true} style={styles.webviewContainer} source={{ html: getTemplate(this.state.anime), baseUrl: '' }}/>
            </View>;
        }
        else {
            containerView = <View style={styles.container}>
                <ProgressBarAndroid color={THEME.PRIMARY_COLOR}/>
            </View>;
        }
        return <View style={{ flex: 1 }}>
            <Toolbar style={toolBarStyle} size={18} leftElement={'navigate-before'} 
        // rightElement={'share'}
        onLeftElementPress={this.goBack} 
        // onRightElementPress={this.share}
        centerElement={this.anime.title}/>
            {containerView}
            <ActionButton style={actionButtonStyle} onPress={this.download} icon={'arrow-downward'}/>
            <ActionButton style={copyActionButtonStyle} onPress={this.copy} icon={'insert-drive-file'}/>
        </View>;
    }
}
export default Details;
