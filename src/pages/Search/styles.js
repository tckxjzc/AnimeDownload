import { StyleSheet } from 'react-native';
import THEME from "../../values/THEME";
export let styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
export let toolBarStyle = {
    container: {
        height: 44,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    titleText: {
        fontSize: 16,
    },
};
