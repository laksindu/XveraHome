import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions} from 'react-native';
import React, { use, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Caption, Icon, Title, TouchableRipple } from 'react-native-paper';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const Settings = () => {

  const navigation = useNavigation()

  const logout =()=>{
    signOut(auth)
    navigation.replace('LoginScreen')

  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={styles.image}>
          <Avatar.Image 
            source={require( '../assets/id.png')}
            size={100}
            backgroundColor = 'white'
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Your ID</Title>
            <Text selectable={true}  style={styles.caption}>{auth.currentUser ?.uid}</Text>
          </View>
        </View>
      </View>

      <View style={styles.test}>
        <TouchableOpacity style={styles.testbtn}>
            <Avatar.Image
            source={require('../assets/setup.png')}
            size={45}
            backgroundColor = "white"
            />
            <Text style={styles.testbtntxt}>How to setup</Text>
        </TouchableOpacity>
                <TouchableOpacity style={styles.testbtn}>
            <Avatar.Image
            source={require('../assets/info.png')}
            size={45}
            backgroundColor = "white"
            />
            <Text style={styles.testbtntxt}>About us</Text>
        </TouchableOpacity>
                <TouchableOpacity style={styles.testbtn}>
            <Avatar.Image
            source={require('../assets/contact.png')}
            size={45}
            backgroundColor = 'white'
            />
            <Text style={styles.testbtntxt}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testbtn}
        onPress={logout}
        >
            <Avatar.Image
            source={require('../assets/logout.png')}
            size={45}
            backgroundColor = 'white'
            />
            <Text style={styles.testbtntxt}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style = {styles.footer}>
        <Text style={styles.footertxt}>Xvera v1.0 - 2025</Text>
      </View>
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:'white'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop:30,
    borderTopRightRadius:ScreenWidth*0.2,
    borderBottomRightRadius:ScreenWidth*0.2,
    height:ScreenHeight*0.15,
    backgroundColor:"#3aa3f8ff",
    paddingHorizontal:ScreenWidth*0.05,
    elevation:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white'
  },
  caption: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    textDecorationLine:'underline',
    color:'#ebe6e6ff'
  },
  test: {
  marginTop: 20,
  paddingHorizontal: 20,
  width:ScreenWidth*0.5
  },

  testbtn: {
  flexDirection: 'row',
  alignItems: 'center', 
  padding: 12,
  backgroundColor: 'white',
  borderRadius: 12,
  },

  testbtntxt: {
  marginLeft: 12,
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
  },
  footer:{
    alignItems:"center",
    marginTop:ScreenHeight*0.28
  },
  footertxt:{
    color:'#8d8c8cff'
  },
  image:{
    flexDirection: 'row', marginTop: 15,
  }


})