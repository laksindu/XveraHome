import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions, Alert} from 'react-native';
import React, { use, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from 'react-native-paper';
//import { TextInput } from 'react-native/types_generated/index';

const { width, height } = Dimensions.get('window')

const baseSize = Math.min(width, height) / 100;

const HomeScreen = ()=> {

    const userid = auth.currentUser?.uid;

    const navigation = useNavigation();

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if(!user){
                navigation.replace("LoginScreen")
            }
        })
        return unsubscribe;
    })

    const show=()=>{
        const uid = auth.currentUser?.uid
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.userdp}>
            <Avatar.Image
            source={require('../assets/robot.png')}
            size={50}/>
        </View>

        <View style = {styles.R1btn}>
            <TouchableOpacity
                onPress={show}
            >
                <Text style={styles.R1_text}>Light 1</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.R2btn}>
            <TouchableOpacity
                onPress={show}
            >
                <Text style={styles.R2_text}>Light 2</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.R3btn}>
            <TouchableOpacity
                onPress={show}
            >
                <Text style={styles.R3_text}>Light 2</Text>
            </TouchableOpacity>
        </View>
        <View style = {styles.R4btn}>
            <TouchableOpacity
                onPress={show}
            >
                <Text style={styles.R4_text}>Light 2</Text>
            </TouchableOpacity>
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
        paddingTop: height * 0.02,
    },
    button:{
        backgroundColor : '#7a84e9',
        width : 100,
        padding : 10,
        borderRadius : 100,
        alignItems : 'center',
        marginTop : 50,
        marginLeft : 250,
        fontSize : 13,
    },
    R1btn:{
        backgroundColor:'#ffffffff',
        width: width * 0.9,
        alignSelf:'center',
        height: 70,
        marginTop: baseSize * 20,
        borderRadius: 30,
        shadowOpacity: 0.3,
        shadowColor: "#7a84e9",
        shadowRadius: 8,
        elevation: 10,
    },
    R2btn:{
        backgroundColor:'#ffffffff',
        width: width * 0.9,
        alignSelf:'center',
        height:'70',
        borderRadius:30,
        shadowRadius:30,
        marginTop:baseSize * 5,
        elevation:10,
        shadowColor:"#7a84e9",
    },
    R1_text:{
        color :'#7a84e9',
        alignSelf:'center',
        //marginTop:'100',
        marginTop:ScreenHeight*0.12,
        fontWeight:'bold'

    },
    R2_text:{
        color :'#7a84e9',
        alignSelf:'center',
        //marginTop:'100',
        marginTop:ScreenHeight*0.12,
        fontWeight:'bold'

    },
        R3btn:{
        backgroundColor:'#ffffffff',
        width: width * 0.9,
        alignSelf:'center',
        height:'70',
        borderRadius:30,
        shadowRadius:30,
        marginTop:baseSize * 5,
        elevation:10,
        shadowColor:"#7a84e9",
    },
    R3_text:{
        color :'#7a84e9',
        alignSelf:'center',
        //marginTop:'100',
        marginTop:ScreenHeight*0.12,
        fontWeight:'bold'
    },
    R4btn:{
        backgroundColor:'#ffffffff',
        width: width * 0.9,
        alignSelf:'center',
        height:'70',
        borderRadius:30,
        shadowRadius:30,
        marginTop:baseSize * 5,
        elevation:10,
        shadowColor:"#7a84e9",
    },
    R4_text:{
        color :'#7a84e9',
        alignSelf:'center',
        //marginTop:'100',
        marginTop:ScreenHeight*0.12,
        fontWeight:'bold'
    },
    Text:{
        color : '#fff',
        fontSize : 13,
        fontWeight : 'bold',
    },
    uid:{
        marginTop : 200,
        marginLeft : 20,
        fontSize : 16,
        fontWeight : 'bold',
    },
    userdp:{
        marginLeft:ScreenWidth*0.8
    },
})

export default HomeScreen;