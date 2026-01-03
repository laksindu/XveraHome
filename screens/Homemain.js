import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar,ScrollView} from 'react-native';
import React, { use, useEffect ,useState} from 'react';
import { auth} from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import {onAuthStateChanged} from 'firebase/auth'
import mqtt from "mqtt"
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Homemain = () => {

  const navigation = useNavigation()

  const Home = () =>{
    navigation.replace('Home')
  }
  return (
    <SafeAreaView style={styles.container}>

    <View style={styles.header}>
      <TouchableOpacity
      onPress={Home}
      style={styles.headerbtn}
      >
        <MaterialCommunityIcons name="arrow-left" size={30} style={{color:'white'}}/>      
      </TouchableOpacity>

      <Text style={styles.headertxt}>Power Usage</Text>
    </View>

      <View style={styles.switch1}></View>
      <View style={styles.switch2}></View>
      <View style={styles.switch3}></View>
      <View style={styles.switch4}></View>



    </SafeAreaView>
  )
}

const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

export default Homemain

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#0B0F14'
  },
  header:{
    flexDirection:'row',
    marginTop:ScreenHeight*0.02,
    marginLeft:ScreenWidth*0.05,
    alignItems:'center'
  },
  headertxt:{
    color:'white',
    fontWeight:'bold',
    fontSize:25,
    marginLeft:ScreenWidth*0.04

  },
  switch1:{
    backgroundColor:'#133665',
    height:150,
    width:ScreenWidth*0.93,
    alignSelf:'center',
    marginTop:ScreenHeight*0.05,
    borderRadius:11
  },
  switch2:{
    backgroundColor:'#133665',
    height:150,
    width:ScreenWidth*0.93,
    alignSelf:'center',
    marginTop:ScreenHeight*0.02,
    borderRadius:11   
  },
  switch3:{
    backgroundColor:'#133665',
    height:150,
    width:ScreenWidth*0.93,
    alignSelf:'center',
    marginTop:ScreenHeight*0.02,
    borderRadius:11    
  },
  switch4:{
    backgroundColor:'#133665',
    height:150,
    width:ScreenWidth*0.93,
    alignSelf:'center',
    marginTop:ScreenHeight*0.02,
    borderRadius:11      
  }
})