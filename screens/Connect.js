import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar,ScrollView,RefreshControl, KeyboardAvoidingView} from 'react-native';
import React, { use, useEffect, useState ,useCallback} from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar, Switch } from 'react-native-paper';
import Toggle from 'react-native-toggle-input'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mqtt from 'mqtt'
import {onAuthStateChanged} from 'firebase/auth'
import prompt from 'react-native-prompt-android';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connect = () => {


    const[pageurl,setPage]=useState(false)
    const[ssid,setSSID] = useState()
    const[pass,setPASS] = useState()
    const[UserId,setUserId] = useState()

  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth , (user) =>{
          if(user){
              setUserId(user.uid)
          }
      })
      return unsubscribe;
  },[])

    const SendData = () =>{
        fetch('http://192.168.4.1/wifi',{
            method:'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"               
            },
            body:`ssid=${ssid}&pass=${pass}&uid=${UserId}`
        })
            .then(response => response.text())
            .then(data => {
            if (data === "OK") {
                alert("WiFi credentials sent successfully");
            }
            })
            .catch(error => {
            console.error("Error:", error);
            });
        }

  return (

<KeyboardAvoidingView
    style={styles.keyborad} 
    behavior="padding"
    enabled={true}
    keyboardVerticalOffset={10}     
    
    >

    {pageurl == false && (
        <View style={styles.mainSet}>
            <Text style={styles.mainSetTxt_1}>Connect with Xvera Home</Text>

            <Image
            source={require('../assets/device.png')}
            style={styles.img}
            />

            <Text style={styles.mainSetTxt_2}>Go to Wi-Fi settings</Text>
            <Text style={styles.mainSetTxt_3}>and connect Xvera Home</Text>
            
            <TouchableOpacity
            style={styles.mainbtn}
            onPress={()=>setPage(true)}
            >
                <Text style={{color:'white',
                            marginTop:7,
                            color:'white',
                             fontWeight:'bold',
                            fontSize:15
                            }}>Next</Text>
            </TouchableOpacity>
        </View>
    )}

    {pageurl == true && (
        <View style={styles.connectionContainer}>
            <Image
            source={require('../assets/wifi.png')}
            style={styles.img2}
            />

            <View style={styles.TextInput}>
            <Text style={[styles.mainSetTxt_4,{marginRight:ScreenWidth*0.5}]}>Your Router ssid :</Text>
                <TextInput
                style={styles.TextInput_styles}
                placeholder='Enter your ssid'
                placeholderTextColor={'gray'}
                value={ssid}
                onChangeText={text=>{setSSID(text)}}
                />
            <Text style={[styles.mainSetTxt_4,{marginRight:ScreenWidth*0.4}]}>Your Router Password :</Text>
                <TextInput
                style={styles.TextInput_styles}
                placeholder='Enter your Password'
                placeholderTextColor={'gray'}
                onChangeText={text=>{setPASS(text)}}
                />
            </View>

            <TouchableOpacity
            style={styles.btn}
            onPress={SendData}
            >
            <Text style={{
                    marginTop:7,
                    color:'white',
                    fontWeight:'bold',
                    fontSize:15
                    }}>
                Connect</Text>

            </TouchableOpacity>

        </View>
        
    )}

    </KeyboardAvoidingView>
  )
}

const ScreenWidth = Dimensions.get("window").width
const ScreenHeight = Dimensions.get("window").height

export default Connect

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#0B0F14'
    },
    mainSet:{
        marginTop:ScreenHeight*0.05
    },
    mainSetTxt_1:{
        color:'white',
        fontSize:32,
        marginLeft:ScreenWidth*0.07,
        fontWeight:'condensedBold'
    },
    img:{
        width:ScreenWidth*0.85,
        height:ScreenHeight*0.4,
        resizeMode:'contain',
        marginTop:ScreenHeight*0.08,
        alignSelf:'center'
    },
    mainSetTxt_2:{
        color:'white',
        alignSelf:'center',
        fontSize:17,
        marginTop:ScreenHeight*0.05
    },
    mainSetTxt_3:{
        color:'white',
        alignSelf:'center',
        fontSize:17,        
    },
    mainbtn:{
        width:130,
        height:40,
        backgroundColor:'#133665',
        borderRadius:20,
        marginTop:ScreenHeight*0.05,
        alignSelf:'center',
        alignItems:'center'
    },
    TextInput_styles:{
        height : 40,
        borderWidth : 1,
        borderColor : '#ccc',
        width : '80%',
        paddingHorizontal : 10,
        marginVertical : 10,
        borderRadius: 18,
        fontSize : 13,
        color:'white'
    },
    TextInput:{
        alignItems:'center',
    },
    keyborad:{
        flex : 1,
        justifyContent : 'center',
        alignContent : 'center',
        backgroundColor:'#0B0F14'
    },
    img2:{
        width:ScreenWidth*0.8,
        height:ScreenHeight*0.4,
        resizeMode:'contain',
        alignSelf:'center'    
    },
    btn:{
        width:130,
        height:40,
        backgroundColor:'#133665',
        borderRadius:20,
        marginTop:ScreenHeight*0.02,
        alignSelf:'center',
        alignItems:'center'        
    },
    mainSetTxt_4:{
        color:'white',
        fontSize:13

    }

})