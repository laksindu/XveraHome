import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView ,ImageBackground, Dimensions } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ScreenHeight = Dimensions.get("window").height

const LoginScreen= ()=>{
    const [Email,setEmail]=useState('');
    const [Password,setPassword]= useState('');

    const navigation = useNavigation();
    const signnavi = useNavigation();

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            if(user){
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [navigation])

    const navigateToSignUp = ()=>{
        signnavi.replace("Main");
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
    <ImageBackground
    source={require('../assets/log1.png')} style={styles.backgroundImage} resizeMode="cover">
    <KeyboardAvoidingView 
      style={styles.keyborad} 
      behavior="padding"
      enabled={true}
      keyboardVerticalOffset={10}
    >
    <ScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={false}>
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

        <TouchableOpacity 
        style = {styles.signupbtn}
        onPress ={navigateToSignUp}>
        <Text style={styles.signuptxt}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
            <Text style={styles.footertxt}>Xvera v1.0 - 2025</Text>
        </View>

    </View>
    </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '90%',
    },

    container :{
        flex : 1,
        marginTop : ScreenHeight * 0.5,
        alignItems : 'center',
        backgroundColor:'#f4f4f4'
    },
    input:{
        height : 40,
        borderWidth : 1,
        borderColor : '#ccc',
        width : '80%',
        paddingHorizontal : 10,
        marginVertical : 10,
        borderRadius: 18,
        fontSize : 13,
    },
    button:{
        backgroundColor : '#2196f3',
        padding : 10,
        marginTop : 15,
        textAlign : 'center',
        textDecorationColor : '#fff',
        borderRadius : 20,
        width : '60%',
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
        justifyContent : 'center',
        alignContent : 'center'
    },
    scrollContent:{
        flexGrow : 1,
        justifyContent : 'center'
    },
    btnstyle:{
        color : '#fff',
        fontSize : 17,
        fontWeight : 'bold'
    },
    signupbtn:{
        backgroundColor : '#f8f5f5ff',
        padding : 10,
        marginTop : 15,
        textAlign : 'center',
        textDecorationColor : '#fff',
        borderRadius : 20,
        width : '60%',
        alignItems : 'center',
        justifyContent : 'center',
        fontFamily : 'fantasy',
        fontSize : 20,
        borderWidth : 2,
        borderColor : '#2196f3',
    },
    signuptxt:{
        color : '#2196f3',
        fontSize : 17,
        fontWeight : 'bold'
    },
    footer:{
        marginTop:ScreenHeight*0.1,
    },
    footertxt:{
        color:'#8d8c8cff',
    }

})
export default LoginScreen;