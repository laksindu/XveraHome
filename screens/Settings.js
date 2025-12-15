import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions} from 'react-native';
import React, { use, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width
const baseSize = Math.min(width, height) / 100;

const Settings = () => {

const navigator = useNavigation()

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      console.log('signout')
    })

    navigator.replace('LoginScreen')

  }

  return (
    <View style = {styles.container}>
      <Text selectable={true}  style={styles.text}>{auth.currentUser.uid}</Text>

    

      <View style={styles.Settingsbtns}>
        <TouchableOpacity
        onPress={handleSignOut}
        >
          <Text style={styles.Settingsbnttxt}>Logout</Text>
        </TouchableOpacity>


    </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    
  },
  text:{
    marginTop:ScreenHeight*0.2,
  },
  Settingsbtns:{
        backgroundColor : '#2196f3',
        width : 100,
        padding : 10,
        borderRadius : 100,
        alignItems : 'center',
        fontSize : 13,
        marginTop:ScreenHeight*0.6,
        elevation:8
  },
  Settingsbnttxt:{
        color : '#fff',
        fontSize : 13,
        fontWeight : 'bold',
  }
})