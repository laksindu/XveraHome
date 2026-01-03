import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar,ScrollView,Modal} from 'react-native';
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
import ModelPicker from '../components/ModelPicker';
import Slider from '@react-native-community/slider';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width
//const UserId = auth.currentUser.uid

const Sensor = () => {

  const navigation = useNavigation()


  const [UserId , setUserId] = useState(null)
  const [sensorValue , setsensor] = useState(0) // updates values when state is changed
  const [humiditysensor , setHumidty] = useState(0)
  const [mqdata , setMqdata] = useState(0)
  const [activePage, setActivePage] = useState('temp');

  //for model picker
  const [chooseData , setchooseData] = useState('')//for switch names from async storage
  const [chooseAction , setchooseAction] = useState('')
  const [isModalVisible, setisModeVisible] = useState(false)
  const [range, setRange] = useState(0);
  const [tempClinet,setClient] = useState()
  const [chooseData1 , setchooseData1] = useState('')// for switch 1 ,2 ,3 ,4 to send via mqtt

  const [pickerType, setPickerType] = useState('switch');
  
  const changevidible = (bool)=>{
    setisModeVisible(bool)
  }

  useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth , (user) =>{
          if(user){
              setUserId(user.uid)
          }
      })
      return unsubscribe;
  },[])// get user id from firebase 
  // auth.currentUser.uid not working

let client;
useEffect(()=>{

  if(UserId){

  const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {//connect with brocker
  });
  //subscribeing topic 
  client.on("connect", () => {
    client.subscribe([
      `iot/${UserId}/from_device/t`,
      `iot/${UserId}/from_device/h`,
      `iot/${UserId}/from_device/mqdata`
    ]);
  });
  
  setClient(client)
  //get message payload
  client.on("message", (topic, message) => {
    //console.log(topic, message.toString());

    if(topic===`iot/${UserId}/from_device/t`){
      const temp = parseFloat(message.toString())
      setsensor(temp)// update the value when with right topic
    }
    else if(topic === `iot/${UserId}/from_device/h`){
      const humidity = parseFloat(message.toString())
      setHumidty(humidity)
    }
    else if(topic === `iot/${UserId}/from_device/mqdata`){
      const mq2 = parseFloat(message.toString())
      setMqdata(mq2)
    }

  });
  }
},[UserId])

console.log(chooseData1)

  // navigate to settings page
  const SettingsNavigation = ()=>{
    navigation.navigate('Settings')
  }

  const sendData = ()=>{
    let Status;
    let TempRange = range
    if(chooseData1 == "Switch 1" && chooseAction == "ON"){
       Status = 'R1_ON'
    }
    else if(chooseData1 == 'Switch 1' && chooseAction == "OFF"){
      Status = 'R1_OFF'
    }
    else if(chooseData1 == "Switch 2" && chooseAction == "ON"){
      Status = 'R2_ON'
    }
    else if(chooseData1 == 'Switch 2' && chooseAction == "OFF"){
      Status = 'R2_OFF'
    }
    else if(chooseData1 == 'Switch 3' && chooseAction == 'ON'){
      Status = 'R3_ON'
    }
    else if(chooseData1 == 'Switch 3' && chooseAction == 'OFF'){
      Status = 'R3_OFF'
    }
    else if(chooseData1 == 'Switch 4' && chooseAction == 'ON'){
      Status = 'R4_ON'
    }
    else if(chooseData1 == 'Switch 4' && chooseAction == 'OFF'){
      Status = 'R4_OFF'
    }

    tempClinet.publish(`iot/${UserId}/to_device`,`{"Range":${TempRange},"Mode":"${Status}"}`)
    tempClinet.publish(`iot/${UserId}/to_device`,"auto")
    
   // console.log(`{"Mode":"${Status}","Range":${TempRange}}`)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headertxt}>Sensors</Text>
        <TouchableOpacity
        onPress={SettingsNavigation}
        >
        <Avatar.Image
        source={require('../assets/user.png')}
        size={50}
        />
        </TouchableOpacity>
      </View>

    <View style={styles.buttons}>
      <TouchableOpacity
        style={[
          styles.btnBase,
          activePage === 'temp' ? styles.btnActive : styles.btnInactive
        ]}
        onPress={() => setActivePage('temp')}
      >
        <MaterialCommunityIcons name="thermometer" size={38} color="white"/>
        <Text style={styles.btn_txt}>Temp</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[
        styles.btnBase,
        activePage === 'humidity' ? styles.btnActive : styles.btnInactive
      ]}
      onPress={() => setActivePage('humidity')}
      >
        <MaterialCommunityIcons     name="water-percent" size={38} color="white"/>
        <Text style={[styles.btn_txt]}>Humidity</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.btnBase,
          activePage === 'ppm' ? styles.btnActive : styles.btnInactive
        ]}
        onPress={() => setActivePage('ppm')}
        >
        <MaterialCommunityIcons name="air-filter" size={38} color="white"/>
        <Text style={[styles.btn_txt]}>PPM</Text>
      </TouchableOpacity>
    </View>

    {activePage === 'temp' && (
      <View style={styles.temp}>
        <AnimatedCircularProgress
          size={280}
          width={17}
          fill={sensorValue || 0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={1}
        >
          {() => <Text style={[styles.temp_txt]}>{sensorValue} ℃</Text>}
        </AnimatedCircularProgress>
        <Text style={[styles.temp_txt_1]}>Temperature</Text>
      </View>
    )}

    {activePage === 'temp' &&(
         <View style={styles.setTemp}>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,alignItems:'center'}}>
            <MaterialCommunityIcons name="thermometer" style={{color:'white',marginLeft:15}} size={17}/>
            <Text style={{color:'white',alignSelf:'center',marginRight:150}}>Set Temperature Trigger</Text>
          </View>

        <View style={styles.tempbtn}>
          <TouchableOpacity
          style={styles.tempbtn1}
          onPress={()=>{
            setPickerType('switch')
            changevidible(true)
          }}
          >
            <Text style={{color:'white',margin:5,fontWeight:'bold'}}>{chooseData?chooseData:'Select device'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.tempbtn1}
          onPress={()=>{
            setPickerType('action')
            changevidible(true)
          }}
          >
            <Text style={{color:'white',margin:5,fontWeight:'bold'}}>{chooseAction?chooseAction:'Select action'}</Text>
          </TouchableOpacity>
            <Text style={{color:'white', fontSize:28, fontWeight:'bold',marginLeft:ScreenWidth*0.07,marginTop:ScreenHeight*0.025}}>{range} ℃</Text>

        </View>
            <Slider
              style={{ width: 300,marginLeft:ScreenWidth*0.02,marginTop:ScreenHeight*0.02 }}
              minimumValue={0}
              maximumValue={60}
              step={1}
              value={range}
              onValueChange={(value) => setRange(value)}
              minimumTrackTintColor="#fbff16ff"
              maximumTrackTintColor="#ffffffff"
            />
            <TouchableOpacity
            style={styles.tempbtn2}
            onPress={sendData}
            >
              <Text style={{color:'white',margin:5,fontWeight:'bold'}}>Set up</Text>
            </TouchableOpacity>   
        </View>

    )}

    {activePage === 'humidity' && (
      <View style={styles.temp}>
        <AnimatedCircularProgress
          size={280}
          width={17}
          fill={humiditysensor || 0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={1}
        >
          {() => <Text style={styles.temp_txt}>{humiditysensor} %</Text>}
        </AnimatedCircularProgress>
        <Text style={styles.temp_txt_1}>Humidity</Text>
      </View>
    )}
    {activePage === 'ppm' && (
      <View style={styles.temp}>
        <AnimatedCircularProgress
          size={280}
          width={17}
          fill={(mqdata/100) || 0}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={1}
        >
          {() => <Text style={styles.temp_txt}>{mqdata}</Text>}
        </AnimatedCircularProgress>
        <Text style={styles.temp_txt_1}>PPM</Text>
      </View>
    )}
          <Modal
            transparent
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => changevidible(false)}
          >
            <ModelPicker
              changevidible={changevidible}
              type={pickerType}
              setData={setchooseData}
              setData1={setchooseData1}
              setActionData={setchooseAction}
            >
            </ModelPicker>
          </Modal>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Sensor

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#0B0F14'
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:ScreenHeight*0.01,
    marginLeft:ScreenWidth*0.05,
    marginRight:ScreenWidth*0.05
  },
  headertxt:{
    fontWeight:'bold',
    fontSize:25,
    color:"white"
  },
  temp_txt:{
    color:'#00e0ff',
    fontSize:47,
    fontWeight:'bold'
  },
  temp:{
    flex:1,
    marginTop:ScreenHeight*0.05,
    alignSelf:'center'
  },
  temp_txt_1:{
    color:'white',
    alignSelf:'center',
    marginTop:ScreenHeight*0.03,
    fontSize:20,
    fontWeight:'bold'
  },
buttons:{
  flexDirection:'row',
  justifyContent:'space-around',
  marginTop:ScreenHeight * 0.045,
  paddingHorizontal:12,
},

btnBase:{
  height:105,
  width:115,
  borderRadius:18,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#1A2232',
  elevation:6,
  shadowColor:'#000',
  shadowOffset:{ width:0, height:4 },
  shadowOpacity:0.25,
  shadowRadius:6,
},

btnActive:{
  backgroundColor:'#133665',
  shadowColor:'#0F5EF7',
},

btnInactive:{
  backgroundColor:'#2A3142',
},

btn_txt:{
  marginTop:6,
  color:'white',
  fontWeight:'600',
  fontSize:14,
  letterSpacing:0.5,
},
setTemp:{
  backgroundColor:'#133665',
  width:ScreenWidth*0.9,
  height:ScreenHeight*0.23,
  alignSelf:'center',
  marginTop:ScreenHeight*0.04,
  borderRadius:30,
  //flexDirection:'row',
  //justifyContent:'space-between',
},
setTempbtn_1:{
  backgroundColor:'#3d5875',
  width:100,
  height:30,
  alignItems:'center',
  marginLeft:ScreenWidth*0.03,
  borderRadius:20
},
setTempbtn_2:{
  backgroundColor:'#3d5875',
  width:100,
  height:30,
  alignItems:'center',
  marginRight:ScreenWidth*0.33,
  borderRadius:20
},
tempbtn:{
  flexDirection:'row',
  alignItems:'center'
},
tempbtn1:{
  backgroundColor:'#3d5875',
  width:110,
  marginLeft:ScreenWidth*0.03,
  alignItems:'center',
  marginTop:ScreenHeight*0.025,
  height:30,
  borderRadius:20
},
tempbtn2:{
  backgroundColor:'#3d5875',
  width:100,
  height:30,
  alignItems:'center',
  marginLeft:ScreenWidth*0.03,
  borderRadius:20,
  marginTop:ScreenHeight*0.02
}
})