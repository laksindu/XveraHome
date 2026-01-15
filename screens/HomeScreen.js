import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar,ScrollView,RefreshControl,PermissionsAndroid, Platform,ActivityIndicator} from 'react-native';
import React, { use, useEffect, useState ,useCallback,useRef} from 'react';
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
import PromptModal from '../components/PromptModal';


const HomeScreen = ()=> {

    const [refreshing, setRefreshing] = useState(false);
    



    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
         setTimeout(() => {
            setRefreshing(false);
        }, 1000);       
    })

    const navigation = useNavigation()
    const [UserId , setUserId] = useState(null)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (user) =>{
            if(user){
                setUserId(user.uid)
            }
        })
        return unsubscribe;
    },[])

 const[switch1,setSwitch1] = useState()//for siwtch states => update from subscribe message and change switch state ( backgroudcolour,toggel)
 const[Switch2, setSwitch2] = useState()
 const[Switch3, setSwitch3] = useState()
 const[Switch4, setSwitch4] = useState()

 const[s1,setS1] = useState("Switch 1")// for siwtch name state => get name from asyncStorage and store it and display in the switch view
 const[s2,setS2] = useState("Switch 2")
 const[s3,setS3] = useState("Siwtch 3")
 const[s4,setS4] = useState("Switch 4")

 const[s1Refresh , s1SetRefresh] = useState()// for show refresh until switch State update ( for ux becuase if user turn on switch this will show refresh animation until update switch state from subscribe message )
 const[s2Refresh , s2SetRefresh] = useState()
 const[s3Refresh , s3SetRefresh] = useState()
 const[s4Refresh , s4SetRefresh] = useState()


 const[s1Visibal , s1SetVisibal] = useState()// for change visibility of the switches button to make space to show refersh animation until update switch state from subscribe message
 const[s2Visibal , s2SetVisibal] = useState()
 const[s3Visibal , s3SetVisibal] = useState()
 const[s4Visibal , s4SetVisibal] = useState()



 const[pageurl,setPage] = useState()

 const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt')

 client.on('connect' , () =>{
    client.subscribe([
        `iot/${UserId}/from_device`,
        `iot/${UserId}/from_device_1`,
        `iot/${UserId}/from_device_2`,
        `iot/${UserId}/from_device_3`,
        `iot/${UserId}/from_device_4`,
    ])
 })



    useEffect(()=>{
        const Mqtt = ()=>{
            client.on('message',(topic,message)=>{
                if(topic == `iot/${UserId}/from_device_1`){
                    if(message == "R1_ON"){
                        setSwitch1(true)
                        s1SetRefresh(false)// send false parameter to refresh state after subscribe message then the switch refresh animation will stop
                        s1SetVisibal(true)//  send true paramter to siwtch visibility to show switches button (I false this because need to make a space for animate the switch refresh in sswitch view )
                    }
                    else if(message == "R1_OFF"){
                        setSwitch1(false)
                        s1SetRefresh(false)
                        s1SetVisibal(true)
                    }
                }
                else if(topic == `iot/${UserId}/from_device_2`){
                    if(message == "R2_ON"){
                        setSwitch2(true)
                        s2SetRefresh(false)
                        s2SetVisibal(true)
                    }
                    else if(message == "R2_OFF"){
                        setSwitch2(false)
                        s2SetRefresh(false)
                        s2SetVisibal(true)
                    }
                }
                else if(topic == `iot/${UserId}/from_device_3`){
                    if(message == "R3_ON"){
                        setSwitch3(true)
                        s3SetRefresh(false)
                        s3SetVisibal(true)
                    }
                    else if(message == "R3_OFF"){
                        setSwitch3(false)
                        s3SetRefresh(false)
                        s3SetVisibal(true)

                    }
                }
                else if(topic == `iot/${UserId}/from_device_4`){
                    if(message == "R4_ON"){
                        setSwitch4(true)
                        s4SetRefresh(false)
                        s4SetVisibal(true)

                    }
                    else if(message == "R4_OFF"){
                        setSwitch4(false)
                        s4SetRefresh(false)
                        s4SetVisibal(true)

                    }
                }
            })
        }
        Mqtt()
    })

useEffect(()=>{
        const data = ()=>{
            client.on('message',(topic,message)=>{
                if(topic == `iot/${UserId}/from_device`){
                    if(message == "online"){
                        console.log("Device is online")
                        setPage(true)
                        setRefreshing(false)
                    }
                    else if(message == "offline"){
                        console.log("Device is offline")
                        setPage(false)
                        setRefreshing(false)
                    }
                }
            })
        }
        data()
    })

    //This useEffect is to set initial refreshing state to true on component mount
    //So that when app is opened refreshing indicator is shown until device status is received from mqtt

useEffect(()=>{
    setRefreshing(true)

    setTimeout(()=>{
        setRefreshing(true)
        setPage(false)
    },3000)

},[])


 const SettingsNavigation = ()=>{
    navigation.navigate('Settings')
 }



useEffect(()=>{
    const SetData = async()=>{
        const SavedData = await AsyncStorage.getItem("data")
        if(SavedData){
           // console.log(SavedData)
            const parsData = JSON.parse(SavedData)
            setS1(parsData.Switch_1)
            setS2(parsData.Switch_2)
            setS3(parsData.Switch_3)
            setS4(parsData.Switch_4)
        }
    }
    SetData()
})

const ConnectNav = ()=>{
    navigation.navigate('Connect')
}

  return (
    <>
    <StatusBar hidden = {false}/>

    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>

    {pageurl == true &&(
        <View>
        <View style={styles.userdp}>
            <Text style={styles.headertxt}>My Home</Text>
            <TouchableOpacity
            onPress={SettingsNavigation}
            >
            <Avatar.Image
            source={require('../assets/user.png')}
            size={50}
            style={{marginRight:ScreenWidth*0.05}}
            />
            </TouchableOpacity>
        </View>
        <Text style={{marginLeft:25 , marginTop:10 , fontSize:18 , color:'white'}}> Hey Welcome</Text>

        <Text style={{color:'white',marginTop:55,marginLeft:ScreenWidth*0.07,fontWeight:'bold'}}>My Devices</Text>

        <View style={styles.upswitches}>
            <View style={[styles.switch1,{backgroundColor:switch1? '#133665':'#646d80'}]}
            >
                <MaterialCommunityIcons  name="light-switch" size={30} color= {switch1? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:switch1? 'white':'#2e3647'}]}>{s1}</Text>                   
                
                {/* if s1Refresh == true then the switch refresh animation will start */ }
                {s1Refresh && (
                    <ActivityIndicator style= {styles.indicator}size={30} color={switch1? "white" : "#2e3647"}/>
                )
                }
                
                {/* if s1Visibal == true this switch button (toggelSwitch) view will show ( this add because if switch refresh is true this will false and make a space to show animation then after get mqtt subscribe message that s1SetVisibal(true) and this view will show ) */}
                {s1Visibal &&(<View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:switch1? 'white':'#2e3647'}]}>{switch1?'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2a497a"}
                toggle = {switch1}
                setToggle={(value)=>{
                    if(value == true){
                        //console.log('checked ' + value)
                        client.publish(`iot/${UserId}/to_device`,'R1_ON')
                        s1SetRefresh(true)//set switch refresh true with publishing message and show the switch refresh ( until get mqtt subscribe message then this will false and sswitch refresh is stop then if user click publish message again this will true and switch refresh animation is start  )
                        s1SetVisibal(false)// set switch Visibal to false to show switch refreshing after click toggel ( until get mqtt subscribe message then this will true and show the toggel button to click next state (on/off) then if user click publish message again this will false and toggel button display will none to show switch refereshing)
                    }
                    else if(value == false){
                        client.publish(`iot/${UserId}/to_device`,'R1_OFF')
                        s1SetRefresh(true)
                        s1SetVisibal(false)
                    }
                }}
                />
                </View>)}


            </View>

            <View style={[styles.switch2,{backgroundColor:Switch2? '#133665':'#646d80'}]}
            >
           <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch2? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>

                <Text style={[styles.switch_txt,{color:Switch2? 'white':'#2e3647'}]}>{s2}</Text>

                {s2Refresh && (
                    <ActivityIndicator style= {styles.indicator}size={30} color={Switch2? "white" : "#2e3647"}/>
                )
                }                

                {s2Visibal && (<View style={styles.toggelSwitch}>
                    
                <Text style={[styles.tog_txt,{color:Switch2? 'white':'#2e3647'}]}>{Switch2?'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2a497a"}
                toggle = {Switch2}
                setToggle={(value2)=>{
                    //setSwitch2(value2)
                    if(value2 == true){
                        //console.log('checked ' + value2)
                        client.publish(`iot/${UserId}/to_device`,'R2_ON')
                        s2SetRefresh(true)
                        s2SetVisibal(false)
                    }
                    else if(value2 == false){
                        client.publish(`iot/${UserId}/to_device`,'R2_OFF')
                        s2SetRefresh(true)
                        s2SetVisibal(false)
                    }
                }}
                />
                </View>
                )}
            </View>
        </View>


            <View style={styles.downswitches}>
            <View style={[styles.switch3 , {backgroundColor:Switch3? '#133665':'#646d80'}]}>
                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch3? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:Switch3? 'white':'#2e3647'}]}>{s3}</Text>

                {s3Refresh && (
                    <ActivityIndicator style= {styles.indicator}size={30} color={Switch3? "white" : "#2e3647"}/>
                )
                }

                {s3Visibal && (<View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:Switch3? 'white':'#2e3647'}]}>{Switch3? 'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2a497a"}
                toggle = {Switch3}
                setToggle={(value3)=>{
                    //setSwitch3(value3)
                    if(value3 == true){
                        //console.log('checked ' + value3)
                        client.publish(`iot/${UserId}/to_device`,'R3_ON')
                        s3SetRefresh(true)
                        s3SetVisibal(false)
                    }
                    else if(value3 == false){
                        client.publish(`iot/${UserId}/to_device`,'R3_OFF')
                        s3SetRefresh(true)
                        s3SetVisibal(false)
                    }
                }}
                />
                </View>)}
            </View>

           <View style={[styles.switch4,{backgroundColor:Switch4? '#133665':'#646d80'}]}>

                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch4? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                
                <Text style={[styles.switch_txt,{color:Switch4? 'white':'#2e3647'}]}>{s4}</Text>

                {s4Refresh && (
                    <ActivityIndicator style= {styles.indicator}size={30} color={Switch4? "white" : "#2e3647"}/>
                )}


                {s4Visibal && (<View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:Switch4? 'white':'#2e3647'}]}>{Switch4? 'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2a497a"}
                toggle = {Switch4}
                setToggle={(value4)=>{
                    //setSwitch4(value4)
                    if(value4 == true){
                        //console.log('checked ' + value4)
                        client.publish(`iot/${UserId}/to_device`,'R4_ON')
                        s4SetRefresh(true)
                        s4SetVisibal(false)
                    }
                    else if(value4 == false ){
                        client.publish(`iot/${UserId}/to_device`,'R4_OFF')
                        s4SetRefresh(true)
                        s4SetVisibal(false)
                    }
                }}
                />
                </View>
                )}
            </View>

        </View>
    </View>)}

       {pageurl == false &&(
         <View style={styles.offlineContainer}>

            <Image
            source={require('../assets/disconnected.png')}
            style={styles.img}
            />
            
            <Text style={styles.disDevcietxt}>No Device found</Text>
            <Text style={styles.disDevcietxt1}>Please make sure your device is powered on</Text>
            <Text style={styles.disDevcietxt2}>and connected to the internet.</Text>

            <TouchableOpacity
            style={styles.addbtn}
            onPress={ConnectNav}
            >
            <Text style={styles.addtxt}>Add Device</Text>
            </TouchableOpacity>
        </View>)}
        

    </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
    </>
  )
}
const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0B0F14',
    },
    userdp:{
        marginTop:ScreenHeight*0.01,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headertxt:{
        fontSize:25,
        fontWeight:'bold',
        marginLeft:ScreenWidth*0.06,
        color:'white'
    },
    upswitches:{
        marginTop:ScreenHeight*0.03,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    switch1:{
        backgroundColor:'white',
        width:ScreenWidth*0.44,
        height:ScreenHeight*0.2,
        marginLeft:ScreenWidth*0.04,
        borderRadius:30,
        elevation:11,
        //flexDirection:'row',
        //justifyContent:'space-between',
    },
    switch2:{
        backgroundColor:'white',
        width:ScreenWidth*0.44,
        height:ScreenHeight*0.2,
        borderRadius:30,
        marginRight:ScreenWidth*0.04,
        elevation:11,
        //flexDirection:'row',
        //justifyContent:'space-between',
    },
    downswitches:{
        marginTop:ScreenHeight*0.02,
        flexDirection:'row',
        justifyContent:'space-between'       
    },
    switch3:{
        backgroundColor:'white',
        width:ScreenWidth*0.44,
        height:ScreenHeight*0.2,
        marginLeft:ScreenWidth*0.04,
        borderRadius:30,
        elevation:11,
        //flexDirection:'row',
        //justifyContent:'space-between'
    },
    switch4:{
        backgroundColor:'white',
        width:ScreenWidth*0.44,
        height:ScreenHeight*0.2,
        marginRight:ScreenWidth*0.04,
        borderRadius:30,
        elevation:11,
        //flexDirection:'row',
        //justifyContent:'space-between'     
    },
    toggelSwitch:{
        marginTop:30,
        //marginRight:15
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:15

    },
    switch_txt:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:18,
        marginLeft:20
    },
    tog_txt:{
        marginLeft:20,
        fontWeight:'bold',
        fontSize:15
    },
    addView:{
        flexDirection:'row',
        justifyContent:'space-between',
        //alignItems:'center'
    },
    addImg:{
        //marginRight:ScreenWidth*0.075,
        backgroundColor:'#0B0F14',
        marginTop:ScreenHeight*0.01
    },
    Power_Usage:{
        width:ScreenWidth*0.91,
        height:60,
        backgroundColor:'#484c53ff',
        marginTop:ScreenHeight*0.06,
        alignSelf:'center',
        borderRadius:25,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15
    },
    Power_txt:{
        color:'white',
        fontSize:25,
        fontWeight:'bold',
        //alignSelf:'center'
        marginRight:ScreenWidth*0.4
    },
    offlineContainer:{
        alignSelf:'center'
    },
    img:{
        width:ScreenWidth*0.9,
        height:ScreenHeight*0.4,
        resizeMode:'contain',
        marginTop:ScreenHeight*0.1
    },
    disDevcietxt:{
        color:'white',
        fontSize:23,
        fontWeight:'bold',
        alignSelf:'center',
        marginTop:ScreenHeight*0.01
    },
    disDevcietxt1:{
        color:'white',
        fontSize:16,
        alignSelf:'center',
        marginTop:ScreenHeight*0.03
    },
    disDevcietxt2:{
       color:'white',
       fontSize:16,
       marginTop:5,
       alignSelf:'center' 
    },
    addbtn:{
        width:130,
        height:40,
        backgroundColor:'#133665',
        borderRadius:20,
        marginTop:ScreenHeight*0.05,
        alignSelf:'center',
        alignItems:'center'
    },
    addtxt:{
        marginTop:7,
        color:'white',
        fontWeight:'bold',
        fontSize:15
    },
    indicator:{
        marginRight:100,
        marginTop:30
    }
})

export default HomeScreen;

//get data from mqtt and show online offline status ( get data from topic iot/userid/from_device ) and set pageurl state and call it with {pageurl == true && (..)} and {pageurl == false && (...)}
//this is {pageurl == true && (..)} and {pageurl == false && (...)} in the return statement for showing online offline status page
//And get switch status from mqtt topics iot/userid/from_device_1 , iot/userid/from_device_2 , iot/userid/from_device_3 , iot/userid/from_device_4 and set switch states with subscribed data
//updating switch states after open app this updating is send from mqtt brocker after open app ( brocker detect app online from pingreq and send saved switches data to this client(phone/app) from same userid and app subscribe to that topics and get data and set switch states. arduino use retained message feature of mqtt )
//So to update switch states on pull to refresh implement setRefreshing(false) when device is online and setRefreshing(true) when device is offline in the useEffect for pageurl state
//And also set initial refreshing state to true in another useEffect on component mount
//retained message feature is used in arduino code to send last switch states when app(phone) get online
//So when app get online brocker send last saved switch states to app and app set switch states accordingly
//Online and offline messages are also sent with retained feature so app get online/offline status on connection
//in arduino code use client.publish(topic,message, {retain:true}) to send retained messages