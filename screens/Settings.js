import { StyleSheet, Text, View,TextInput, TouchableOpacity , Dimensions,FlatList} from 'react-native';
import React, { use, useEffect,useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Caption, Icon, Title, TouchableRipple } from 'react-native-paper';
import PromptModal from '../components/PromptModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const Settings = () => {

  const navigation = useNavigation()

  const logout = async()=>{
    signOut(auth)
    await AsyncStorage.removeItem('data')
    navigation.replace('LoginScreen')

  }

  const Setup_navigation = () =>{
    navigation.navigate('Setup')
  } 
  const [modalVisible, setModalVisible] = useState(false);
  const [names, setNames] = useState([]);

const handleAddName = (name) => {
    setNames([...names, name]); // Add new name
  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={styles.image}>
          <Avatar.Image 
            source={require( '../assets/id.png')}
            size={100}
            backgroundColor = '#133665'
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>Hey there !</Title>
            <Text style={styles.caption}>Profile & account</Text>
          </View>
        </View>
      </View>

      <View style={styles.test}>
                <TouchableOpacity style={styles.testbtn}>
            <Avatar.Image
            source={require('../assets/info.png')}
            size={45}
            backgroundColor = "#000b20"
            />
            <Text style={styles.testbtntxt}>About us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testbtn}>
            <Avatar.Image
            source={require('../assets/contact.png')}
            size={45}
            backgroundColor = '#000b20'
            />
            <Text style={styles.testbtntxt}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testbtn}
        onPress={()=>setModalVisible(true)}
        >
            <Avatar.Image
            source={require('../assets/edit.png')}
            size={42}
            backgroundColor = '#000b20'
            />
            <Text style={styles.testbtntxt}>Edit Device</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.testbtn}
        onPress={logout}
        >
            <Avatar.Image
            source={require('../assets/logout.png')}
            size={45}
            backgroundColor = '#000b20'
            />
            <Text style={styles.testbtntxt}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style = {styles.footer}>
        <Text style={styles.footertxt}>Xvera Home 1.0.6</Text>
      </View>

       <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />

      <PromptModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddName}
        title="Edit Devices Name"
      />
    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor:'#0B0F14'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    marginTop:30,
    borderTopRightRadius:ScreenWidth*0.2,
    borderBottomRightRadius:ScreenWidth*0.2,
    height:ScreenHeight*0.15,
    backgroundColor:"#133665",
    paddingHorizontal:ScreenWidth*0.05,
    elevation:20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white'
  },
  caption: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500',
    //textDecorationLine:'underline',
    color:'#ebe6e6ff'
  },
  test: {
  marginTop: 20,
  paddingHorizontal: 20,
  width:ScreenWidth*0.5
  },

  testbtn: {
  flexDirection: 'row',
  alignItems: 'center', 
  padding: 12,
  backgroundColor: '#0B0F14',
  borderRadius: 12,
  },

  testbtntxt: {
  marginLeft: 12,
  fontSize: 16,
  fontWeight: '600',
  color: 'white',
  },
  footer:{
    alignItems:"center",
    marginTop:ScreenHeight*0.28
  },
  footertxt:{
    color:'#8d8c8cff'
  },
  image:{
    flexDirection: 'row', marginTop: 15,
  }


})