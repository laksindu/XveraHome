import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const main = () => {

    const user = auth.currentUser;
    const navigation = useNavigation();

    const navigaetlogin =()=>{
      navigation.navigate("LoginScreen");
    }
  return (
    <View>
      <TouchableOpacity
      onPress={navigaetlogin}
      style ={styles.button}>
      <Text styles={styles.Text}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor : '#2383c4ff',
        width : 100,
        padding : 10,
        borderRadius : 100,
        alignItems : 'center',
        marginTop : 50,
        marginLeft : 150,
        fontSize : 13,
    },
    Text:{
        color : 'white',
        fontSize : 13,
        fontWeight : 'bold',
    }

})

export default main;