import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from "react-native-material-ui";
import { cardStyle, styles } from "./styles";
class AnimeItem extends Component {
    constructor() {
        /**
         * lifecycle
         */
        super(...arguments);
        /**
         *method
         */
        this.jump = () => {
            this.props.navigation.navigate('Details', { anime: this.props.item });
        };
    }
    render() {
        let { item } = this.props;
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
}
export default AnimeItem;
