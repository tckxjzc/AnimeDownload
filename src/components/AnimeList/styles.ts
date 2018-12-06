import {StyleSheet} from "react-native";
import THEME from "../../values/THEME";


export let styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f1f1f1"
    },
    modalView:{
        padding:10,
        backgroundColor:'#fff',
    },
    controlView:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:10,
    },
    modalText:{
        marginTop:10,
        fontSize:12,
        color:THEME.PRIMARY_COLOR,
    },
    textInput:{
        marginTop:10,
        padding:0,
        borderBottomWidth:1,
        borderBottomColor:THEME.PRIMARY_COLOR,
    }
});

export  let actionButtonStyle={
    container:{
        height:44,
        width:44,
        backgroundColor: THEME.PRIMARY_COLOR
    }
};
export  let jumpButtonStyle={
    container:{
        height:30,
        width:'auto',
        backgroundColor: THEME.PRIMARY_COLOR
    }
};