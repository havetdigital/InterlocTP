import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const CommonHeader = ({title ,customStyle ,onPress }) => {
  console.log('global.mode', global.mode)
  return (
    <View style={[styles.container ,customStyle ,global.mode !== 'Mode dévelopement' && styles.headerTop]}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Image style={styles.backImgStyle} source={require('../assets/arrow_back.png')} />
        </TouchableOpacity>
      <Text style={styles.titleStyle}>{title}</Text>
      <View  style={styles.buttonContainer} />
        
    </View>
  )
}

export default CommonHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginHorizontal:20
    },
    buttonContainer:{
        height:26,
        width:26
    },
    backImgStyle:{
        height:"100%",
        width:"100%"
    },
    titleStyle:{
        fontSize: 30,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#b85f32',
    },

    headerTop: {
      paddingTop: '5%'
    }

});