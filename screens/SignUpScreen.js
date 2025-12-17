import React, { useEffect, useState } from 'react';
import { Dimensions,StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView , ImageBackground} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const baseSize = width / 100;

const SignUpScreen = () => {

  const navigation = useNavigation()
      const [Email,setEmail]=useState('');
      const [Password,setPassword]= useState('');

      const handleSignup = ()=>{

        if(!Email || !Password){
          alert("Fill the all field")
          return
        }else{

              createUserWithEmailAndPassword(auth, Email, Password)
              .then((userCredentials)=>{
                  const user = userCredentials.user;
                  console.log('Registered with:', user.email);
                  navigation.replace('Home')
              })
              .catch(error=>alert(error.message));
            }
      }

      const backnavigate = useNavigation()

      const navigateBack = ()=>{
        backnavigate.replace("LoginScreen")
}

  return (
    <ImageBackground source={require('../assets/signup.png')} style ={styles.backgroundimage} resizeMode='cover'>
    <KeyboardAvoidingView 
      style={styles.keyborad} 
      behavior="padding"
      enabled={true}
      keyboardVerticalOffset={10}
    >
    <ScrollView contentContainerStyle={styles.scrollContent} scrollEnabled={false}>
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
    </ScrollView>
    </KeyboardAvoidingView>
    </ImageBackground>
  )
}
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  backgroundimage:{
    flex:1,
    width:"100%",
    height:"100%"
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
  container:{
    flex : 1,
    alignItems : 'center',
    marginTop : ScreenHeight * 0.5,
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
    backgroundColor : '#7a84e9',
    width : '100%',
    width : '60%',
    padding : 15,
    borderRadius : 100,
    alignItems : 'center',
    marginTop : 20,
    elevation:5

  },
  Text:{
    color : '#fff',
    fontSize : 17,
    fontWeight : 'bold',
  },
  backbtn:{
    borderWidth : 1,
    borderColor : '#7a84e9',
    backgroundColor : '#f3f4f5ff',
    width : 100,
    width : '60%',
    padding : 15,
    borderRadius : 100,
    alignItems : 'center',
    marginTop : 20,

  },
  backText:{
    color : '#7a84e9',
    fontSize : 17,
    fontWeight : 'bold',
  }

})

export default SignUpScreen;