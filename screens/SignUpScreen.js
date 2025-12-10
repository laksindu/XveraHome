import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {

      const [Email,setEmail]=useState('');
      const [Password,setPassword]= useState('');

      const handleSignup = ()=>{
              createUserWithEmailAndPassword(auth, Email, Password)
              .then((userCredentials)=>{
                  const user = userCredentials.user;
                  console.log('Registered with:', user.email);
              })
              .catch(error=>alert(error.message));
      }

      const backnavigate = useNavigation()

      const navigateBack = ()=>{
        backnavigate.replace("LoginScreen")
}

  return (
    <View style={styles.container}>
      <TextInput
       placeholder='Enter your Email'
        style={styles.input}
        value={Email}
        onChangeText={text=>{ setEmail(text)}}
      ></TextInput>
      <TextInput
       placeholder='Enter your Password'
       style={styles.input}
       secureTextEntry={true}
        value={Password}
        onChangeText={text=>{setPassword(text)}}
      ></TextInput>
      <TouchableOpacity
      onPress={handleSignup}
      style ={styles.button}>
      <Text style={styles.Text}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
      onPress={navigateBack}
      style ={styles.backbtn}>
      <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex : 1,
    alignItems : 'center',
    marginTop : 380,
  },
  input:{
    width : 300,
    height : 50,
    borderColor : '#ccc',
    borderWidth : 1,
    padding : 10,
    marginVertical : 10,
    borderRadius : 18,
    fontSize : 13,
  },
  button:{
    backgroundColor : '#2383c4ff',
    width : 100,
    padding : 10,
    borderRadius : 100,
    alignItems : 'center',
    marginTop : 20,
    width : '60%',
  },
  Text:{
    color : '#fff',
    fontSize : 13,
    fontWeight : 'bold',
  },
  backbtn:{
    borderWidth : 1,
    borderColor : '#2383c4ff',
    backgroundColor : '#f3f4f5ff',
    width : 100,
    padding : 10,
    borderRadius : 100,
    alignItems : 'center',
    marginTop : 20,
    width : '60%',
  },
  backText:{
    color : '#2383c4ff',
    fontSize : 13,
    fontWeight : 'bold',
  }

})

export default SignUpScreen;