import {StyleSheet} from 'react-native';
import DIMENSIONS from "../../values/DIMENSIONS";
import THEME from "../../values/THEME";



const {SCREEN_WIDTH,SCREEN_HEIGHT,STATUS_BAR_HEIGHT}=DIMENSIONS;
let width=SCREEN_WIDTH*0.4;
let toolbarHeight=44;

let webHeight=SCREEN_HEIGHT-toolbarHeight-STATUS_BAR_HEIGHT;
export let toolBarStyle = {
    container: {
        height:toolbarHeight,
        backgroundColor: THEME.PRIMARY_COLOR
    },
    titleText:{
        fontSize:14
    },
    leftElement:{

    },
    rightElement:{

    }
};
export let buttonStyle={
    container:{
        marginTop:20,
        backgroundColor: THEME.PRIMARY_COLOR,
    },
    text:{
        color:'#fff'
    }
};
export let actionButtonStyle={
    container:{
        bottom:20,
        width:44,
        height:44,
        backgroundColor: THEME.PRIMARY_COLOR,
    }
};
export let copyActionButtonStyle={
    container:{
        bottom:72,
        width:44,
        height:44,
        backgroundColor: THEME.PRIMARY_COLOR,
    }
};

export let styles = StyleSheet.create({
    titleStyle: {
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 15,
        textAlign: 'center'
    },
    container:{
        flex:1,
        // paddingTop:20,
        // paddingBottom:20,
        // paddingLeft:20,
        // paddingRight:20,
        alignItems:'center',
        justifyContent:'center',
    },
    image:{
        width:width,
        height:width*16/9,
        marginBottom:20,
    },
    webviewContainer:{
        width:SCREEN_WIDTH,
        height: webHeight,
    }
});