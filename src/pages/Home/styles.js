import { StyleSheet } from 'react-native';
import THEME from "../../values/THEME";
const NAV_HEIGHT = 44;
const NAV_BOTTOM = 20;
export let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 5,
    },
    navContainer: {
        position: 'absolute',
        height: NAV_HEIGHT,
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: THEME.PRIMARY_COLOR,
    }
});
export let buttonStyle = {
    container: {
        width: 160,
        height: 30,
        // borderRadius:10,
        backgroundColor: THEME.PRIMARY_COLOR
    }
};
export let navButtonStyle = {
    container: {
        flex: 1,
        height: NAV_HEIGHT,
        // borderRadius:10,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    text: {
        color: THEME.PRIMARY_FONT_COLOR,
    }
};
export let toolBarStyle = {
    container: {
        height: 44,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    titleText: {
        fontSize: 16,
    },
};
// noinspection JSSuspiciousNameCombination
export let actionButtonStyle = {
    container: {
        height: NAV_HEIGHT,
        width: NAV_HEIGHT,
        bottom: NAV_HEIGHT,
        backgroundColor: THEME.PRIMARY_COLOR
    },
};
export let toolbarContainer = {
    backgroundColor: THEME.PRIMARY_COLOR
};
