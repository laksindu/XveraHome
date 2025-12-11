import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView ,ImageBackground} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const main = () => {
    const navigation = useNavigation();

    const navigaetlogin =()=>{
      navigation.navigate("SignUpScreen");
    }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
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
        backgroundColor : '#6425e2ff',
        width : 100,
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

export default main;