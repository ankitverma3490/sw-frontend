import { StyleSheet } from "react-native";


export const hocStyles = StyleSheet.create({
    cartContainer:{
        position:'absolute',
        width:'100%',
        bottom:0,
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        elevation:10,
        shadowOffset: {width:1,height:1},
        shadowOpacity:0.3,
        shadowRadius:5
    }
})