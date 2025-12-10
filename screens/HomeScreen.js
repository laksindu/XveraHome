import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import React, { use, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
//import { TextInput } from 'react-native/types_generated/index';



const HomeScreen = ()=> {

    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if(!user){
                navigation.navigate("LoginScreen")
            }
        })
        return unsubscribe;
    })

    const handleSignOut = ()=>{
        signOut(auth)
        .then(()=>{
            //alert("Need to Signout again");
            console.log('User signed out');

        })
        .catch(error=>{
            alert(error.message);
        });
    }

  return (
    <View>
        <TouchableOpacity
        onPress={handleSignOut}
        style ={styles.button}
        >
        <Text style={styles.Text}>Logout</Text>
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
        marginLeft : 250,
        fontSize : 13,

    },
    Text:{
        color : '#fff',
        fontSize : 13,
        fontWeight : 'bold',
    }
})

export default HomeScreen;