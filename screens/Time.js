import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Modal, } from 'react-native';
import React, { use, useEffect, useState} from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SelectCountry } from 'react-native-element-dropdown';
import ModelPicker from '../components/ModelPicker'

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

let Status;

const Time = () => {

const [date,setDate]= useState(new Date())
const [text , setText] = useState('Empty')

const [chooseData , setchooseData] = useState('')
const [chooseAction , setchooseAction] = useState('')
const [isModalVisible, setisModeVisible] = useState(false)

const [pickerType, setPickerType] = useState('switch');

const changevidible = (bool)=>{
  setisModeVisible(bool)
}

const udate = (event, selectedDate)=>{
  const currentDate = selectedDate || date
  setDate(currentDate)
}

const uTime = (event, selectedDate)=>{
  const currentDate = selectedDate || date
  setDate(currentDate)
}

const onChange=(event,selectedDate)=>{

    if(chooseData == "Switch 1" && chooseAction == "ON"){
       Status = 'R1_ON'
    }
    else if(chooseData == 'Switch 1' && chooseAction == "OFF"){
      Status = 'R1_OFF'
    }
    else if(chooseData == "Switch 2" && chooseAction == "ON"){
      Status = 'R2_ON'
    }
    else if(chooseData == 'Switch 2' && chooseAction == "OFF"){
      Status = 'R2_OFF'
    }
    else if(chooseData == 'Switch 3' && chooseAction == 'ON'){
      Status = 'R3_ON'
    }
    else if(chooseData == 'Switch 3' && chooseAction == 'OFF'){
      Status = 'R3_OFF'
    }
    else if(chooseData == 'Switch 4' && chooseAction == 'ON'){
      Status = 'R4_ON'
    }
    else if(chooseData == 'Switch 4' && chooseAction == 'OFF'){
      Status = 'R4_OFF'
    }


  const currentDate = selectedDate || date;
  setDate(currentDate)

  let task = "R1_ON"
  let tempDate = new Date(currentDate)
  let time = 'Time is set to :- '+tempDate.getHours() + ":" + tempDate.getMinutes() + ' Status is :'+task;
  setText(time)

  const obj = {
    Hours : tempDate.getHours(),
    Minute : tempDate.getMinutes(),
    date : tempDate.getDate(),
    Status : Status,
  }

  console.log(obj)
}

const showTimePicker = () => {
  DateTimePickerAndroid.open({
    value: date,
    mode: 'time',
    is24Hour: true,
    onChange: uTime,
  });
};

const showDatePicker = ()=>{
  DateTimePickerAndroid.open({
    value:date,
    mode:'date',
    is24Hour:true,
    onChange:udate,
  })
}
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dp}>
        <Text style={styles.headertxt}>Set Schedule</Text>
        <Avatar.Image
        source={require('../assets/user.png')}
        size={50}
        />
      </View>


      <View style={styles.switches}>
          <Text style={styles.switchestxt}>Select Switch</Text>
          <TouchableOpacity style={styles.switouch}
          onPress={()=>{
            setPickerType('switch');
            changevidible(true);
          }}
          >
            <Text style= {styles.switext}>Select switch</Text>
            <Avatar.Image
            source={require('../assets/add.png')}
            size={20}
            backgroundColor = '#2196f3'
            />
          </TouchableOpacity>
          <Text style={styles.outtext}>{chooseData}</Text>
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
              setActionData={setchooseAction}
            >
            </ModelPicker>
          </Modal>
      </View>
      <View style={styles.action}>
        <Text style={styles.actiontxt}>Select Action</Text>
        <TouchableOpacity style={styles.switouch}
          onPress={()=>{
                setPickerType('action');
                changevidible(true)
          }}
          >
            <Text style= {styles.switext}>Select Action</Text>
            <Avatar.Image
            source={require('../assets/add.png')}
            size={20}
            backgroundColor = '#2196f3'
            />
          </TouchableOpacity>

          <Text style={styles.outtext2}>{chooseAction}</Text>
      </View>


        {/* For time and others*/}
        
      <View style={styles.time}>
      <TouchableOpacity
      onPress={showTimePicker}
      style={styles.timepicker}
      >
         <Text style={styles.timeheaders}>Select Time</Text>
         <Avatar.Image
         source={require('../assets/clock.png')}
         size={40}
         backgroundColor='#2196f3'
         />           
      </TouchableOpacity>

      <TouchableOpacity
      onPress={showDatePicker}
      style={styles.datepicker}
      >
      <Text style={styles.datetxt}>Select date</Text>
         <Avatar.Image
         source={require('../assets/calender.png')}
         size={40}
         backgroundColor='#2196f3'
         />           
      </TouchableOpacity>
      </View>

      <View style={styles.sub}>
        <TouchableOpacity
        style={styles.submitbtn}
        onPress={onChange}
        >
          <Text style={styles.subtxt}>Set up</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default Time

const styles = StyleSheet.create({

  container:{
    flex:1,
  },
  dp:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginLeft:ScreenWidth*0.06,
    marginRight:ScreenWidth*0.05,
    marginTop:ScreenHeight*0.01
  },
  switches:{
    alignSelf:'center',
    marginTop:ScreenHeight*0.04,
    backgroundColor:'#2196f3',
    height:ScreenHeight*0.2,
    width:ScreenWidth*0.94,
    borderRadius:30,
    elevation:10
  },
  switchestxt:{
    color:'white',
    fontWeight:'bold',
    marginLeft:20,
    marginTop:20
  },
  action:{
    alignSelf:'center',
    marginTop:ScreenHeight*0.02,
    backgroundColor:'#2196f3',
    height:ScreenHeight*0.2,
    width:ScreenWidth*0.94,
    borderRadius:30,
    elevation:10
  },
  actiontxt:{
    color:'white',
    fontWeight:'bold',
    marginLeft:20,
    marginTop:20
  },
  
  time:{
    alignSelf:'center',
    marginTop:ScreenHeight*0.02,
    backgroundColor:'#2196f3',
    height:ScreenHeight*0.2,
    width:ScreenWidth*0.94,
    borderRadius:30,
    elevation:10
  },
  timepicker:{
    flexDirection:'row',
    marginLeft:ScreenWidth*0.03,
    marginRight:ScreenWidth*0.03,
    marginTop:ScreenHeight*0.02,
    //backgroundColor:'blue',
    padding:11,
    justifyContent:'space-between',
    alignItems:'center'
  },
  timeheaders:{
    color:'white',
    //fontWeight:'bold',
    fontSize:17
  },
  datepicker:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:11,
    marginLeft:ScreenWidth*0.03,
    marginRight:ScreenWidth*0.03,
    alignItems:'center'
  },
  datetxt:{
    color:'white',
    fontSize:17,
    //fontWeight:'bold'
  },
  sub:{
    flex:1,
    alignSelf:'center',
    marginTop:ScreenHeight*0.04,
  },
  submitbtn:{
    backgroundColor:'#2196f3',
    padding:11,
    width:150,
    borderRadius:30,
  },
  subtxt:{
    color:'white',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:17
  },
  switouch:{
    flexDirection:'row',
    justifyContent:'space-between',
    //backgroundColor:'white',
    marginTop:ScreenHeight*0.035,
    marginLeft:ScreenWidth*0.04,
    marginRight:ScreenWidth*0.05,
    borderRadius:20,
    padding:10,
    borderWidth:0.5,
    borderColor:'white'
  },
  switext:{
    color:'white'
  },
  outtext:{
    color:'white',
    marginLeft:ScreenWidth*0.7,
    marginTop:ScreenHeight*0.02
  },
  outtext2:{
    color:'white',
    marginTop:ScreenHeight*0.02,
    marginLeft:ScreenWidth*0.78
  },
  headertxt:{
    fontSize:22,
    fontWeight:'bold'

  }
})