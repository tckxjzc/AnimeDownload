import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Anime from "../../interface/bean/Anime";
import {Card} from "react-native-material-ui";
import {cardStyle, styles} from "./styles";
import {NavigationScreenProp, NavigationState} from "react-navigation";

type Props = {
    navigation: NavigationScreenProp<NavigationState>,
    item: Anime,

};


class AnimeItem extends Component<Props> {
    /**
     * lifecycle
     */

    render() {
        let {item} = this.props;

        return <Card style={cardStyle} onPress={this.jump}>
            <View>
                <Text style={styles.title}> {item.title} </Text>
                <View style={styles.menu}>
                    <Text style={styles.menuText}>{item.updateDate}</Text>
                    <Text style={styles.menuText}>{item.size}</Text>
                </View>
            </View>
        </Card>;
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

    /**
     *method
     */
    jump = () => {
        this.props.navigation.navigate('Details', {anime: this.props.item});
    };
}

export default AnimeItem;
