import { StyleSheet, Text, View , Dimensions,ScrollView,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';

const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const Setup = () => {
  return (
    <SafeAreaView style = {styles.container}>
    <ScrollView>
        
    <View style = {styles.header}>
      <Text style = {styles.headtxt}>Let's Setup</Text>
    </View>

    <View style = {styles.Setup_container}>
        <Image
        source={require('../assets/setup2.png')}
        style={styles.Setupimg}
        backgroundColor={'#0B0F14'}
        />
    </View>

    <View style={styles.Setup}>
        <Text style={styles.Setuptxt}>1. Device Installation</Text>
        <Text style={styles.txtline1}>Power up your device and wait for the status light to turn blue. Next, connect your appliances and switches to the device.</Text>
        <Text style={styles.txtline1}>⚠️ Safety First:  Ensure your main power supply is turned off before making any electrical connections.</Text>

        <Text style={styles.Setuptxt2}>2. Device Setup</Text>
        <Text style={styles.txtline1}>Once powered, navigate to the Settings page in the Xvera Home app and copy your unique ID.  eg :- a8xxxxxxxx</Text>
        <Text style={styles.txtline1}>Connect your smartphone to the device's Wi-Fi network ( named <Text  style={{color:'#aac7ff'}}>Xvera Home </Text>). Open a web browser, go to <Text style={{color:'#aac7ff',fontWeight:'bold'}}>192.168.4.1</Text> and select Configure WiFi.</Text>
        <Text style={styles.txtline1}>Enter your home router's <Text style={{color:'#aac7ff'}}>SSID</Text> and <Text style={{color:'#aac7ff'}}>Password</Text>, paste your ID into the required field,and click Save.{"\n"}{"\n"}Wait a moment for the connection to finalize, the blue light will turn off once the device is successfully linked to your home network. You are now ready to control your home through the Xvera Home app.</Text>
    </View>


    <View style={styles.contact}>
    <Text style={styles.contact_txt}>If your have any problem ?</Text>
    <TouchableOpacity
    onPress={()=>{}}
    style={styles.contactbnt}
    >
    <Text style={{color:'#0B0F14',fontWeight:'bold'}}>Contact Us</Text>
    </TouchableOpacity>
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default Setup

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#0B0F14'
    },
    headtxt:{
        color:'white',
        alignSelf:'center',
        fontSize:23,
        fontWeight:'bold'
    },
    header:{
        marginTop:ScreenHeight*0.04,

    },
    Setup_container:{
        flex:1
    },
    Setupimg:{
        alignSelf:'center',
        width:300,
        height:300,
        marginTop:ScreenHeight*0.05
    },
    Setup:{
        flex:1
    },
    Setuptxt:{
        color:'#aac7ff',
        marginLeft:ScreenWidth*0.075,
        marginTop:ScreenHeight*0.075,
        fontSize:22,
        fontWeight:'bold'
    },
    txtline1:{
        color:'white',
        fontSize:16,
        marginLeft:ScreenWidth*0.075,
        marginTop:ScreenHeight*0.03,
        marginRight:ScreenWidth*0.075
    },
    Setuptxt2:{
        color:'#aac7ff',
        marginLeft:ScreenWidth*0.075,
        marginTop:ScreenHeight*0.055,
        fontSize:22,
        fontWeight:'bold'

    },
    contactbnt:{
        backgroundColor:'#aac7ff',
        width:95,
        padding:10,
        alignItems:'center',
        borderRadius:11,
        marginRight:ScreenWidth*0.075
    },
    contact:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:ScreenHeight*0.08,
        bottom:ScreenHeight*0.03,
    },
    contact_txt:{
        color:'#aac7ff',
        marginLeft:ScreenWidth*0.075

    }
})