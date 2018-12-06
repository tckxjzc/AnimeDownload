import React, { Component } from 'react';
import { View } from 'react-native';
import ComicatManager from "../../comicat/ComicatManager";
import AnimeList from "../../components/AnimeList";
import { styles, toolBarStyle } from "./styles";
import { Toolbar } from "react-native-material-ui";
class Search extends Component {
    /**
     * lifecycle
     */
    constructor(props) {
        super(props);
        /**
         *method
         */
        this.goBack = () => {
            this.props.navigation.goBack();
        };
        this.keyword = props.navigation.getParam("keyword");
        this.animeManger = new ComicatManager().search(this.keyword);
    }
    render() {
        return <View style={styles.container}>
            <Toolbar style={toolBarStyle} leftElement="navigate-before" onLeftElementPress={this.goBack} centerElement={this.keyword}/>
            <AnimeList navigation={this.props.navigation} animeManager={this.animeManger}/>
        </View>;
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
}
export default Search;
