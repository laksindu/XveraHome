import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image} from 'react-native';
import React, { use, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const Sensor = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>Sensors</Text>
        <Avatar.Image
        source={require('../assets/user.png')}
        size={50}
        />
      </View>

      <View style={styles.dht_contaiiners}>
        <View style={styles.dht_contaiiners1}>
          <Avatar.Image
          source={require('../assets/temp.png')}
          size={45}
          backgroundColor = 'white'
          style={{marginLeft:5 , marginTop:10}}
          />
          <Text style={styles.dht_txt}>29°C</Text>
          <Text style = {styles.footertxt}>Temperature</Text>
        </View>
        <View style={styles.dht_contaiiners2}>
          <Avatar.Image
          source={require('../assets/humidity.png')}
          size={40}
          backgroundColor = 'white'
          style={{marginLeft:6 , marginTop:11}}
          />
          <Text style={styles.dht_txt}>68%</Text>
          <Text style = {styles.footertxt}>Humidity</Text>
        </View>
      </View>

      <View style={styles.mq2_container}>
        <Avatar.Image
        source={require('../assets/air.png')}
        size={45}
        backgroundColor = '#2196f3'
        style={{marginLeft:8, marginTop:11}}
        />

      <Text style={styles.airtxt}>698</Text>
      
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
    backgroundColor:'white'
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
    fontSize:25
  },
  dht_contaiiners:{
    marginTop:ScreenHeight*0.1,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  dht_contaiiners1:{
    backgroundColor:'white',
    marginLeft:ScreenWidth*0.04,
    width:ScreenWidth*0.44,
    height:ScreenHeight*0.2,
    borderRadius:30,
    borderWidth:1.5,
    borderColor:'#2196f3'
  },
    dht_contaiiners2:{
    backgroundColor:'white',
    width:ScreenWidth*0.44,
    height:ScreenHeight*0.2,
    marginRight:ScreenWidth*0.04,
    borderRadius:30,
    borderWidth:1.5,
    borderColor:'#2196f3'
  },
  mq2_container:{
    backgroundColor:'#2196f3',
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
    fontSize:45,
    fontWeight:'bold',
    alignSelf:'center',
    color:'#45484bff'
  },
  footertxt:{
    alignSelf:'center',
    marginTop:20,
    fontSize:13,
    color:'#2196f3',
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
    borderWidth:3,
    borderColor:'#2196f3',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  ask_ai_btn_txt:{
    color:'#2196f3',
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
    backgroundColor:'#2196f3',
    borderRadius:100
  }

})