import {StyleSheet} from "react-native";
import THEME from "../../values/THEME";


export let styles = StyleSheet.create({
    title: {
        fontSize: 14,
        // color: '#317fff'
    },
    menu: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuText: {
        fontSize: 12,
        color: '#666',
    }
});

export let cardStyle = {
    container: {
        // height:200
        padding: 8,
        // backgroundColor:'rgba(0,0,0,0)'
    }
};
