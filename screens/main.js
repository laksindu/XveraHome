import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView ,ImageBackground,Image,Dimensions} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width


const main = () => {
    const navigation = useNavigation();

    const navigaetlogin =()=>{
      navigation.navigate("main1");
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.data_container}>
        <Image
        source={require('../assets/main1.png')}
        style={styles.image}
        />
        <Text style={styles.text1}>CONTROL</Text>
        <Text style={styles.text2}>Control your devices from home</Text>
        <Text style={styles.text3}> or from anywhere in the world</Text>
        <Text style={styles.text4}>and just relax.</Text>

        <View style={styles.skips}>
          <View style={styles.skip1}></View>
          <View style={styles.skip2}></View>
          </View>
          
        </View>

      <TouchableOpacity
      onPress={navigaetlogin}
      style ={styles.button}>
      <Text style ={styles.btntext}>Next</Text>   
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex : 1,
    },

    button:{
        backgroundColor : '#2196f3',
        width : 100,
        padding : 10,
        borderRadius : 100,
        alignItems : 'center',
        fontSize : 13,
        position : 'absolute',
        bottom : 40,
        alignSelf : 'center',
        elevation:10,
    },
    btntext:{
        alignItems : 'center',
        fontWeight : 'bold',
        color : 'white',
    },
    image:{
      width:'79%',
      height:'40%',
      alignSelf:'center',
      marginTop:120
    },
    data_container:{
      flex:1
    },
    text1:{
      alignSelf:'center',
      marginTop:ScreenHeight*0.05,
      fontSize:25,
      fontWeight:'bold',
      color:'#2196f3'
    },
    text2:{
      alignSelf:'center',
      fontSize:18,
      marginTop:ScreenHeight*0.025,
      color:'#7a7a7cff'
    },
    text3:{
      alignSelf:'center',
      fontSize:18,
      color:'#7a7a7cff'      
    },
    text4:{
      alignSelf:'center',
      fontSize:18,
      color:'#7a7a7cff'        
    },
    skips:{
      alignSelf:'center',
      marginTop:ScreenHeight*0.08,
      flexDirection:'row',
      justifyContent:'space-between'
    },
    skip1:{
      backgroundColor:'#2196f3',
      width:10,
      height:10,
      borderRadius:10
    },
    skip2:{
      backgroundColor:'white',
      width:10,
      height:10,
      borderRadius:10,
      borderWidth:1.5,
      borderColor:'#2196f3',
      marginLeft:ScreenWidth*0.01,    
    }

})

export default main;