import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView ,ImageBackground, Dimensions} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ScreenWidth = Dimensions.get("window").width

const main1 = () => {
    const navigation = useNavigation();

    const navigaetlogin =()=>{
      navigation.navigate("Homemain");
    }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/main2.png')} style={styles.backgroundImage}>
      </ImageBackground>
      <TouchableOpacity
      onPress={navigaetlogin}
      style ={styles.button}>
      <Text style ={styles.btntext}>Next</Text>   
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    },

    button:{
        backgroundColor : '#2196f3',
        width : ScreenWidth *0.5,
        padding : 10,
        borderRadius : 100,
        alignItems : 'center',
        fontSize : 13,
        position : 'absolute',
        bottom : 40,
        alignSelf : 'center',
        elevation:10,
        shadowColor:'#000000ff',
        shadowOpacity:0.1
    },
    btntext:{
        alignItems : 'center',
        fontWeight : 'bold',
        color : '#fff',
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }

})

export default main1;