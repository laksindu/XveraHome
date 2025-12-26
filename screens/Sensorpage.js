import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image,StatusBar} from 'react-native';
import React, { use, useEffect ,useState} from 'react';
import { auth} from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import {onAuthStateChanged} from 'firebase/auth'
import mqtt from "mqtt"


const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width
//const UserId = auth.currentUser.uid

const Sensor = () => {

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

  const client = mqtt.connect("ws://broker.emqx.io:8083/mqtt", {
  });

  const [sensorValue , setsensor] = useState()
  const [humiditysensor , setHumidty] = useState()
  const [mqdata , setMqdata] = useState()

  client.on("connect", () => {
    client.subscribe([
      `iot/${UserId}/from_device/t`,
      `iot/${UserId}/from_device/h`,
      `iot/${UserId}/from_device/mqdata`
    ]);
  });
  
  client.on("message", (topic, message) => {
    console.log(topic, message.toString());
    if(topic===`iot/${UserId}/from_device/t`){
      setsensor(message.toString())
    }else if(topic === `iot/${UserId}/from_device/h`){
      setHumidty(message.toString())
    }else if(topic === `iot/${UserId}/from_device/mqdata`){
      setMqdata(message.toString())
    }

  });

  const SettingsNavigation = ()=>{
    navigation.navigate('Settings')
  }

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.dht_contaiiners}>
        <View style={styles.dht_contaiiners1}>
          <Avatar.Image
          source={require('../assets/temp.png')}
          size={45}
          backgroundColor = '#133665'
          style={{marginLeft:5 , marginTop:10}}
          />
          <Text style={styles.dht_txt}>{sensorValue}</Text>
          <Text style = {styles.footertxt}>Temperature</Text>
        </View>
        <View style={styles.dht_contaiiners2}>
          <Avatar.Image
          source={require('../assets/humidity.png')}
          size={40}
          backgroundColor = '#133665'
          style={{marginLeft:6 , marginTop:11}}
          />
          <Text style={styles.dht_txt}>{humiditysensor}</Text>
          <Text style = {styles.footertxt}>Humidity</Text>
        </View>
      </View>

      <View style={styles.mq2_container}>
        <Avatar.Image
        source={require('../assets/air.png')}
        size={45}
        backgroundColor = '#133665'
        style={{marginLeft:8, marginTop:11}}
        />

      <Text style={styles.airtxt}>{mqdata}</Text>
      
      <View style={styles.air_continer}>
      <Image
      source={require('../assets/air4.png')}
      backgroundColor = 'white'
      style={styles.airImage}
      />
      </View>

      </View>

    <View style={styles.ask_ai}>
      <TouchableOpacity
      onPress={()=>{}}
      style={styles.ask_ai_btn}
      >
      <Avatar.Image
      source={require('../assets/askai.png')}
      size={25}
      backgroundColor = 'white'
      />  
      <Text style={styles.ask_ai_btn_txt}>Ask from Ai...</Text>
      </TouchableOpacity>
    </View>

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
  dht_contaiiners:{
    marginTop:ScreenHeight*0.1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  dht_contaiiners1:{
    backgroundColor:'#133665',
    marginLeft:ScreenWidth*0.04,
    width:ScreenWidth*0.44,
    height:ScreenHeight*0.2,
    borderRadius:30,
    //borderWidth:2.5,
    //borderColor:'#2a497a'
  },
    dht_contaiiners2:{
    backgroundColor:'#133665',
    width:ScreenWidth*0.44,
    height:ScreenHeight*0.2,
    marginRight:ScreenWidth*0.04,
    borderRadius:30,
    //borderWidth:2.5,
    //borderColor:'#2a497a'
  },
  mq2_container:{
    backgroundColor:'#133665',
    width:ScreenWidth*0.93,
    height:ScreenHeight*0.2,
    marginTop:ScreenHeight*0.04,
    alignSelf:'center',
    borderRadius:30,
    borderColor:'white',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  dht_txt:{
    fontSize:39,
    fontWeight:'bold',
    alignSelf:'center',
    color:'white'
  },
  footertxt:{
    alignSelf:'center',
    marginTop:20,
    fontSize:12,
    color:'white',
    fontWeight:'bold'
  },
  airtxt:{
    color:'white',
    fontSize:50,
    marginLeft:ScreenWidth*0.01,
    fontWeight:'bold',
    alignSelf:'center'
  },
  ask_ai:{
    alignSelf:'center',
    marginTop:30,
  },
  ask_ai_btn:{
    padding:9,
    width:151,
    borderRadius:30,
    alignItems:'center',
    borderWidth:2,
    borderColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'white'
  },
  ask_ai_btn_txt:{
    color:'#032b5b',
    fontSize:15,
    fontWeight:'bold'
  },
  air_continer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  airImage:{
    marginRight:ScreenWidth*0.1,
    alignSelf:'center',
    height:ScreenHeight*0.16,
    width:120,
    backgroundColor:'#133665',
    borderRadius:100
  }

})