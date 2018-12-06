import React, {Component} from 'react';
import {FlatList, RefreshControl, ToastAndroid, View, Text, TextInput} from 'react-native';
import {actionButtonStyle, jumpButtonStyle, styles} from "./styles";
import AnimeManager, {ListResult} from "../../interface/anime/AnimeManager";

import AnimeItem from "../AnimeItem";
import Anime from "../../interface/bean/Anime";
import Pagination from "../../interface/anime/Pagination";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import THEME from "../../values/THEME";
import {ActionButton, Button} from "react-native-material-ui";
import Modal from "react-native-modal";

type Props = {
    navigation: NavigationScreenProp<NavigationState>,
    animeManager: AnimeManager<Pagination>,
};
type State = {
    list: ListResult,
    loading: boolean,
    pageModal: boolean,
};

class AnimeList extends Component<Props, State> {
    /**
     * lifecycle
     */
    state = {
        list: [],
        loading: false,
        pageModal: false,
    };
    anime: AnimeManager<Pagination>;

    constructor(props) {
        super(props);
        this.anime = props.animeManager;
    }

    render() {
        return <View style={styles.container}>
            <FlatList
                data={this.state.list}
                ref={this.flatList}
                onEndReached={this.load}
                onEndReachedThreshold={0.3}
                refreshControl={
                    <RefreshControl
                        onRefresh={this.first}
                        refreshing={this.state.loading}
                        colors={[THEME.PRIMARY_COLOR]}
                    />
                }
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
            {/*<Modal*/}
            {/*visible={this.state.pageModal}*/}
            {/*transparent={true}*/}
            {/*onRequestClose={() => {*/}
            {/*}}*/}
            {/*animationType={'slide'}>*/}
            {/*<View style={styles.modalOuterView}>*/}
            {/*<View style={styles.modalInnerView}>*/}
            {/*<Text>test</Text>*/}
            {/*<Button onPress={this.closePageModal} text={'ok'}/>*/}
            {/*</View>*/}
            {/*</View>*/}

            {/*</Modal>*/}
            <Modal isVisible={this.state.pageModal}>

                <View style={styles.modalView}>
                    <Text>跳转到</Text>
                    <Text
                        style={styles.modalText}>{`当前在第 ${this.anime.pagination.page} 页, 总共 ${this.anime.pagination.max} 页`}</Text>
                    <TextInput onChangeText={this.selectPage} style={styles.textInput} keyboardType={'numeric'}
                               maxLength={9} numberOfLines={1}/>
                    <View style={styles.controlView}>
                        <Button style={jumpButtonStyle} primary={true} raised={true} onPress={this.jump}
                                text={'确认'}/>
                    </View>
                </View>

            </Modal>

            {this.state.list.length > 0 ?
                <ActionButton style={actionButtonStyle} onPress={this.showPageModal} icon={'redo'}/> : null}

        </View>;
    }

    componentDidMount() {
        this.mounted = true;
        this.first();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    flatList = React.createRef<FlatList<any>>()
    /**
     *properties
     */
    mounted: boolean;
    page: number;
    /**
     *method
     */
    renderItem = ({item}) => {
        return <AnimeItem navigation={this.props.navigation} item={item}/>
    };
    keyExtractor = (item: Anime) => {
        return item.id
    };
    first = () => {
        this.startLoading();
        this.anime.first().then((result) => {
            if (this.mounted) {
                this.setState({list: result});
                this.endLoading();
                if (result.length == 0) {
                    ToastAndroid.show('No Data', ToastAndroid.LONG);
                }
            }
        }).catch(() => {
            this.endLoading();
        });
    };
    load = () => {
        if (this.anime.pagination.hasNext()) {
            this.startLoading();
            this.anime.next().then((result) => {
                if (this.mounted) {
                    this.setState({list: this.state.list.concat(result)});
                    this.endLoading();
                }
            }).catch(() => {
                this.endLoading();
            })
        }
    };
    startLoading = () => {
        this.setState({loading: true});
    };
    endLoading = () => {
        this.setState({loading: false});
    };
    showPageModal = () => {
        this.setState({pageModal: true});
    };
    closePageModal = () => {
        this.setState({pageModal: false});
    };

    selectPage = (text) => {
        let page = parseInt(text);
        if (isNaN(page) || page > this.anime.pagination.max) {
            this.page = undefined;
        } else {
            this.page = page;
        }
    };

    jump = () => {
        this.closePageModal();

        if (this.page) {
            this.startLoading();
            this.flatList.current.scrollToIndex({index: 0});
            this.anime.go(this.page).then((result) => {
                if (this.mounted) {

                    this.setState({list: result});
                    this.endLoading();
                }
                this.page = undefined;
            }).catch(() => {
                this.endLoading();
                this.page = undefined;
            })
        }

    };

}

export default AnimeList;
