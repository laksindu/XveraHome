import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView ,ImageBackground,Image,Dimensions} from 'react-native';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width


const main1 = () => {
    const navigation = useNavigation();

    const navigaetlogin =()=>{
      navigation.navigate("SignUpScreen");
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.data_container}>
        <Image
        source={require('../assets/sensor.png')}
        style={styles.image}
        />
        <Text style={styles.text1}>MONITOR</Text>
        <Text style={styles.text2}>Monitor your home from</Text>
        <Text style={styles.text3}>anywhere in the world</Text>
        <Text style={styles.text4}>with one simple tap</Text>

        <View style={styles.skips}>
          <View style={styles.skip1}></View>
          <View style={styles.skip2}></View>
          </View>

        </View>

      <TouchableOpacity
      onPress={navigaetlogin}
      style ={styles.button}>
      <Text style ={styles.btntext}>Get started</Text>   
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex : 1,
    },

    button:{
        backgroundColor : '#133665',
        width : 120,
        padding : 12,
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
      width:'89%',
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
      color:'#133665'
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
      backgroundColor:'white',
      width:10,
      height:10,
      borderRadius:10,
      borderWidth:1.5,
      borderColor:'#133665',
    },
    skip2:{
      marginLeft:ScreenWidth*0.01,
      backgroundColor:'#133665',
      width:10,
      height:10,
      borderRadius:10    
    }

})

export default main1;