import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const LoginScreen= ()=>{
    const [Email,setEmail]=useState('');
    const [Password,setPassword]= useState('');

    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if(user){
                navigation.navigate("Home")
            }
        })
        return unsubscribe;
    })

    const handleSignup = ()=>{
        createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredentials)=>{
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
        })
        .catch(error=>alert(error.message));
    }
    const handleLogin = ()=>{
        if(!Email || !Password){
            alert("Please enter all the details");
            return;
        }
        signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredentials)=>{
            const user = userCredentials.user;
            console.log('Registered with:', user.email);
        })
        .catch(error=>alert(error.message));
    }

  return (
    <KeyboardAvoidingView style={styles.keyborad} behavior="padding">
    <View style={styles.container}>
        <TextInput
            placeholder='Email'
            style ={styles.input}
            value={Email}
            onChangeText={text=>{ setEmail(text)}}
        ></TextInput>
        <TextInput
            placeholder='Password'
            style ={styles.input}
            secureTextEntry={true}
            value={Password}
            onChangeText={text=>{ setPassword(text)}}
        ></TextInput>
        
        <TouchableOpacity
         onPress={handleLogin}
         style={styles.button}
         >
        <Text style={styles.btnstyle}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.button}
        onPress ={handleSignup}>
        <Text style={styles.btnstyle}>Sign Up</Text>
        </TouchableOpacity>

    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
        container :{
        flex : 1,
        //justifyContent : 'center',
        marginTop :380,
        alignItems : 'center'
    },
    input:{
        height : 40,
        borderWidth : 1,
        borderColor : '#000',
        width : '80%',
        paddingHorizontal : 10,
        marginVertical : 10,
        borderRadius: 18,
        fontSize : 13,
    },
    button:{
        backgroundColor : '#2383c4ff',
        padding : 10,
        marginTop : 15,
        textAlign : 'center',
        textDecorationColor : '#fff',
        borderRadius : 20,
        width : '70%',
        alignItems : 'center',
        justifyContent : 'center',
        fontFamily : 'fantasy',
        fontSize : 20,
    },
    text:{
        left : '27%',
        marginTop : 10,
        textDecorationLine : 'underline',
        fontFamily : 'sans-serif-medium',
    },
    keyborad:{
        flex : 1,
        behavior : 'padding',
        justifyContent : 'center',
        alignContent : 'center'

    },
    btnstyle:{
        color : '#fff',
        fontSize : 17,
        fontWeight : 'bold'
    },

})
export default LoginScreen;