import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ComicatManager from "../../comicat/ComicatManager";
import AnimeList from "../../components/AnimeList";
import {NavigationScreenProp, NavigationState} from "react-navigation";
import {styles, toolBarStyle} from "./styles";
import AnimeManager from "../../interface/anime/AnimeManager";
import Pagination from "../../interface/anime/Pagination";
import {Toolbar} from "react-native-material-ui";

type Props = {
    navigation: NavigationScreenProp<NavigationState>,
};


class Search extends Component<Props> {
    /**
     * lifecycle
     */
    constructor(props: Props) {
        super(props);
        this.keyword = props.navigation.getParam("keyword");
        this.animeManger = new ComicatManager().search(this.keyword);
    }

    render() {
        return <View style={styles.container}>
            <Toolbar
                style={toolBarStyle}
                leftElement="navigate-before"
                onLeftElementPress={this.goBack}
                centerElement={this.keyword}
            />
            <AnimeList navigation={this.props.navigation} animeManager={this.animeManger}/>
        </View>;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    /**
     *properties
     */
    mounted: boolean;
    animeManger: AnimeManager<Pagination>;
    keyword: string;
    /**
     *method
     */
    goBack = () => {
        this.props.navigation.goBack();
    }

}

export default Search;
