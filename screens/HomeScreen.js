import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert,Image} from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Switch } from 'react-native-paper';
import Toggle from 'react-native-toggle-input'
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { TextInput } from 'react-native/types_generated/index';



const HomeScreen = ()=> {

 const[switch1,setSwitch1] = useState()
 const[Switch2, setSwitch2] = useState()
 const[Switch3, setSwitch3] = useState()
 const[Switch4, setSwitch4] = useState()


  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userdp}>
            <Text style={styles.headertxt}>My Home</Text>
            <Avatar.Image
            source={require('../assets/user.png')}
            size={50}
            style={{marginRight:ScreenWidth*0.05}}
            />
        </View>
        <Text style={{marginLeft:25 , marginTop:10 , fontSize:18 , color:'#666262ff'}}> Hey Welcome ! 🖐</Text>

        <View style={styles.upswitches}>
            <View style={[styles.switch1,{backgroundColor:switch1? '#2196f3':'white'}]}
            >
                <MaterialCommunityIcons  name="light-switch" size={30} color= {switch1? 'white':'#818080ff'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:switch1? 'white':'#818080ff'}]}>Switch 1</Text>

                <View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:switch1? 'white':'#818080ff'}]}>{switch1?'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2196f3"}
                toggle = {switch1}
                setToggle={(value)=>{
                   setSwitch1(value)
                    if(value == true){
                        console.log('checked ' + value)
                    }
                }}
                />
                </View>


            </View>

            <View style={[styles.switch2,{backgroundColor:Switch2? '#2196f3':'white'}]}
            >
           <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch2? 'white':'#818080ff'} style={{marginLeft:15 , marginTop:15}}/>

                <Text style={[styles.switch_txt,{color:Switch2? 'white':'#818080ff'}]}>Switch 2</Text>

                <View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:Switch2? 'white':'#818080ff'}]}>{Switch2?'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2196f3"}
                toggle = {Switch2}
                setToggle={(value2)=>{
                    setSwitch2(value2)
                    if(value2 == true){
                        console.log('checked ' + value2)
                    }
                }}
                />
                </View>
            </View>
        </View>

        <View style={styles.downswitches}>
            <View style={[styles.switch3 , {backgroundColor:Switch3? '#2196f3':'white'}]}>
                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch3? 'white':'#818080ff'} style={{marginLeft:15 , marginTop:15}}/>
                <Text style={[styles.switch_txt,{color:Switch3? 'white':'#818080ff'}]}>Switch 3</Text>

                <View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:Switch3? 'white':'#818080ff'}]}>{Switch3? 'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2196f3"}
                toggle = {Switch3}
                setToggle={(value3)=>{
                    setSwitch3(value3)
                    if(value3 == true){
                        console.log('checked ' + value3)
                    }
                }}
                />
                </View>
            </View>
            <View style={[styles.switch4,{backgroundColor:Switch4? '#2196f3':'white'}]}>

                <MaterialCommunityIcons  name="light-switch" size={30} color= {Switch4? 'white':'#818080ff'} style={{marginLeft:15 , marginTop:15}}/>
                
                <Text style={[styles.switch_txt,{color:Switch4? 'white':'#818080ff'}]}>Switch 4</Text>

                <View style={styles.toggelSwitch}>
                <Text style={[styles.tog_txt,{color:Switch4? 'white':'#818080ff'}]}>{Switch4? 'On':'Off'}</Text>
                <Toggle
                color = {'#e0e2e4ff'}
                size = {20}
                filled={true}
                circleColor={"#2196f3"}
                toggle = {Switch4}
                setToggle={(value4)=>{
                    setSwitch4(value4)
                    if(value4 == true){
                        console.log('checked ' + value4)
                    }
                }}
                />
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}
const ScreenWidth = Dimensions.get('window').width
const ScreenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f4f8',
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
        marginLeft:ScreenWidth*0.06
    },
    upswitches:{
        marginTop:ScreenHeight*0.07,
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
})

export default HomeScreen;