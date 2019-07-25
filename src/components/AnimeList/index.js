import React, { Component } from 'react';
import { FlatList, RefreshControl, ToastAndroid, View, Text, TextInput } from 'react-native';
import { actionButtonStyle, jumpButtonStyle, styles } from "./styles";
import AnimeItem from "../AnimeItem";
import THEME from "../../values/THEME";
import { ActionButton, Button } from "react-native-material-ui";
import Modal from "react-native-modal";
class AnimeList extends Component {
    constructor(props) {
        super(props);
        /**
         * lifecycle
         */
        this.state = {
            list: [],
            loading: false,
            pageModal: false,
        };
        this.flatList = React.createRef();
        /**
         *method
         */
        this.renderItem = ({ item }) => {
            return <AnimeItem navigation={this.props.navigation} item={item}/>;
        };
        this.keyExtractor = (item) => {
            return item.id;
        };
        this.first = () => {
            this.startLoading();
            this.anime.first().then((result) => {
                if (this.mounted) {
                    this.setState({ list: result });
                    this.endLoading();
                    if (result.length == 0) {
                        ToastAndroid.show('No Data', ToastAndroid.LONG);
                    }
                }
            }).catch(() => {
                this.showError();
            });
        };
        this.load = () => {
            if (this.anime.pagination.hasNext()) {
                this.startLoading();
                this.anime.next().then((result) => {
                    if (this.mounted) {
                        this.setState({ list: this.state.list.concat(result) });
                        this.endLoading();
                    }
                }).catch(() => {
                    this.showError();
                });
            }
        };
        this.startLoading = () => {
            this.setState({ loading: true });
        };
        this.endLoading = () => {
            this.setState({ loading: false });
        };
        this.showPageModal = () => {
            this.setState({ pageModal: true });
        };
        this.closePageModal = () => {
            this.setState({ pageModal: false });
        };
        this.selectPage = (text) => {
            let page = parseInt(text);
            if (isNaN(page) || page > this.anime.pagination.max) {
                this.page = undefined;
            }
            else {
                this.page = page;
            }
        };
        this.jump = () => {
            this.closePageModal();
            if (this.page) {
                this.startLoading();
                this.flatList.current.scrollToIndex({ index: 0 });
                this.anime.go(this.page).then((result) => {
                    if (this.mounted) {
                        this.setState({ list: result });
                        this.endLoading();
                    }
                    this.page = undefined;
                }).catch(() => {
                    this.showError();
                    this.page = undefined;
                });
            }
        };
        this.showError = () => {
            ToastAndroid.show('error', ToastAndroid.LONG);
            this.endLoading();
        };
        this.anime = props.animeManager;
    }
    render() {
        let map = new Map();
        this.state.list.forEach(function (item) {
            map.set(item.id, item);
        });
        return <View style={styles.container}>
            <FlatList data={[...map.values()]} ref={this.flatList} onEndReached={this.load} onEndReachedThreshold={0.3} refreshControl={<RefreshControl onRefresh={this.first} refreshing={this.state.loading} colors={[THEME.PRIMARY_COLOR]}/>} keyExtractor={this.keyExtractor} renderItem={this.renderItem}/>
            
            
            
            
            
            
            
            
            
            
            
            

            
            <Modal isVisible={this.state.pageModal}>

                <View style={styles.modalView}>
                    <Text>跳转到</Text>
                    <Text style={styles.modalText}>{`当前在第 ${this.anime.pagination.page} 页, 总共 ${this.anime.pagination.max} 页`}</Text>
                    <TextInput onChangeText={this.selectPage} style={styles.textInput} keyboardType={'numeric'} maxLength={9} numberOfLines={1}/>
                    <View style={styles.controlView}>
                        <Button style={jumpButtonStyle} primary={true} raised={true} onPress={this.jump} text={'确认'}/>
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
}
export default AnimeList;
