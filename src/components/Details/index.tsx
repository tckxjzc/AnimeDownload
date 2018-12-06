import React, {Component} from 'react';
import {Linking, ProgressBarAndroid, ToastAndroid, View,Clipboard, WebView,} from 'react-native';
import {actionButtonStyle, styles, toolBarStyle} from "./styles";
import getTemplate from "./getTemplate";
import injectedJavaScript from "./injectedJavaScript";
import THEME from "../../values/THEME";
import Anime from "../../interface/bean/Anime";
import AnimeManager from "../../interface/anime/AnimeManager";
import Pagination from "../../interface/anime/Pagination";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import ComicatManager from "../../comicat/ComicatManager";
import {ActionButton, Toolbar} from "react-native-material-ui";

type Props = {
    navigation: NavigationScreenProp<NavigationState>,
};
type State = {
    anime: Anime
};

class Details extends Component<Props, State> {
    /**
     * lifecycle
     */
    mounted = false;
    state = {
        anime: null,
    };

    constructor(props: Props) {
        super(props);
        this.anime = props.navigation.getParam('anime')
    }

    componentDidMount() {
        this.mounted = true;
        this.animeManager.getDetails(this.anime.id).then((result) => {
            if (this.mounted) {
                this.setState({anime: Object.assign({}, this.anime, {details: result.details})});
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
                <WebView
                    onMessage={this.onMessage}
                    injectedJavaScript={injectedJavaScript}
                    scrollEnabled={true}
                    style={styles.webviewContainer}

                    source={{html: getTemplate(this.state.anime), baseUrl: ''}}
                />
            </View>
        } else {
            containerView = <View style={styles.container}>
                <ProgressBarAndroid color={THEME.PRIMARY_COLOR}/>
            </View>
        }


        return <View style={{flex: 1}}>
            <Toolbar
                style={toolBarStyle}
                size={18}
                leftElement={'navigate-before'}
                // rightElement={'share'}
                onLeftElementPress={this.goBack}
                // onRightElementPress={this.share}
                centerElement={this.anime.title}
            />
            {containerView}
            <ActionButton style={actionButtonStyle} onPress={this.download} icon={'arrow-downward'}/>
            {/*<ActionButton style={copyActionButtonStyle} onPress={this.copy} icon={'insert-drive-file'}/>*/}
        </View>
    }

    /**
     *properties
     */
    anime: Anime;
    animeManager: AnimeManager<Pagination> = new ComicatManager();

    /**
     *method
     */
    download = () => {
        let link = `magnet:?xt=urn:btih:${this.anime.torrent}`;
        Linking.canOpenURL(link).then((supported) => {
            if (supported) {
                Linking.openURL(link)
            } else {
                Clipboard.setString(link);
                ToastAndroid.show('未安装bt下载工具,已经复制下载链接到剪贴板', ToastAndroid.LONG);
            }
        })
    };
    goBack = () => {
        this.props.navigation.goBack();
    };
    onMessage = (e) => {
        Linking.openURL(e.nativeEvent.data).catch(err => console.error('An error occurred', err))
    }
}

export default Details;