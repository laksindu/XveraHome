import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar,ScrollView,RefreshControl} from 'react-native';
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
import PromptModal from '../components/PromptModal';


const HomeScreen = ()=> {

    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);



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

 const[switch1,setSwitch1] = useState()
 const[Switch2, setSwitch2] = useState()
 const[Switch3, setSwitch3] = useState()
 const[Switch4, setSwitch4] = useState()

 const[s1,setS1] = useState("Switch 1")
 const[s2,setS2] = useState("Switch 2")
 const[s3,setS3] = useState("Siwtch 3")
 const[s4,setS4] = useState("Switch 4")

 const[pageurl,setPage] = useState()

 const client = mqtt.connect('ws://broker.emqx.io:8083/mqtt')

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
                    }
                    else if(message == "R1_OFF"){
                        setSwitch1(false)
                    }
                }
                else if(topic == `iot/${UserId}/from_device_2`){
                    if(message == "R2_ON"){
                        setSwitch2(true)
                    }
                    else if(message == "R2_OFF"){
                        setSwitch2(false)
                    }
                }
                else if(topic == `iot/${UserId}/from_device_3`){
                    if(message == "R3_ON"){
                        setSwitch3(true)
                    }
                    else if(message == "R3_OFF"){
                        setSwitch3(false)
                    }
                }
                else if(topic == `iot/${UserId}/from_device_4`){
                    if(message == "R4_ON"){
                        setSwitch4(true)
                    }
                    else if(message == "R4_OFF"){
                        setSwitch4(false)
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
                        //alert("Device is online")
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

useEffect(()=>{
    setRefreshing(true)
},[])


 const SettingsNavigation = ()=>{
    navigation.navigate('Settings')
 }

 const Power = ()=>{
    navigation.navigate('Homemain')
 }


useEffect(()=>{
    const SetData = async ()=>{
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
        <Text style={{marginLeft:25 , marginTop:10 , fontSize:18 , color:'white'}}> Hey Welcome ! 🖐</Text>


        <TouchableOpacity
        style={styles.Power_Usage}
        onPress={Power}
        >
         <MaterialCommunityIcons  name="lightning-bolt" size={30} style={{color:'yellow',backgroundColor:'#646d80',borderRadius:30}}/>   
         <Text style={styles.Power_txt}>40 W</Text>
          <MaterialCommunityIcons  name="arrow-right" size={30} style={{color:'white',}}/>
        </TouchableOpacity>  

        <Text style={{color:'white',marginTop:25,marginLeft:ScreenWidth*0.07,fontWeight:'bold'}}>My Devices</Text>

        <View style={styles.upswitches}>
            <View style={[styles.switch1,{backgroundColor:switch1? '#133665':'#646d80'}]}
            >
                <MaterialCommunityIcons  name="light-switch" size={30} color= {switch1? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:switch1? 'white':'#2e3647'}]}>{s1}</Text>


                <View style={styles.toggelSwitch}>
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
                    }
                    else if(value == false){
                        client.publish(`iot/${UserId}/to_device`,'R1_OFF')
                    }
                }}
                />
                </View>


            </View>

            <View style={[styles.switch2,{backgroundColor:Switch2? '#133665':'#646d80'}]}
            >
           <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch2? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>

                <Text style={[styles.switch_txt,{color:Switch2? 'white':'#2e3647'}]}>{s2}</Text>

                <View style={styles.toggelSwitch}>
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
                    }
                    else if(value2 == false){
                        client.publish(`iot/${UserId}/to_device`,'R2_OFF')
                    }
                }}
                />
                </View>
            </View>
        </View>


            <View style={styles.downswitches}>
            <View style={[styles.switch3 , {backgroundColor:Switch3? '#133665':'#646d80'}]}>
                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch3? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:Switch3? 'white':'#2e3647'}]}>{s3}</Text>

                <View style={styles.toggelSwitch}>
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
                    }
                    else if(value3 == false){
                        client.publish(`iot/${UserId}/to_device`,'R3_OFF')
                    }
                }}
                />
                </View>
            </View>

           <View style={[styles.switch4,{backgroundColor:Switch4? '#133665':'#646d80'}]}>

                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch4? 'white':'#2e3647'} style={{marginLeft:15 , marginTop:15}}/>
                
                <Text style={[styles.switch_txt,{color:Switch4? 'white':'#2e3647'}]}>{s4}</Text>

                <View style={styles.toggelSwitch}>
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
                    }
                    else if(value4 == false ){
                        client.publish(`iot/${UserId}/to_device`,'R4_OFF')
                    }
                }}
                />
                </View>
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
    }
})

export default HomeScreen;