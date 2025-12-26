import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'; 



import HomeScreen from './HomeScreen'
import Sensorpage from './Sensorpage'
import Settings from './Settings'
import Time from './Time'

const homename = 'Home'
const SensorName = 'Sensor'
const Settingsname = 'Settings'
const Timename = 'Time'

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
        <Tab.Navigator
        initialRouteName={homename}
        screenOptions={({route})=>({
                tabBarIcon : ({focused , color , size})=>{
                    let IconName
                    let rn = route.name
                    if(rn === homename){
                        IconName = focused ? 'home' : 'home-outline'
                    }else if(rn === SensorName){
                        IconName = focused ? 'hardware-chip' : 'hardware-chip-outline'
                    }else if(rn === Settingsname){
                        IconName = focused ? 'settings' : 'settings-outline'
                    }else if(rn === Timename){
                        IconName = focused ? 'time' : 'time-outline'
                    }

                    return <Ionicons name={IconName} size={size} color={color} />

                },
                tabBarStyle:{
                    backgroundColor:'#0B0F14',
                    borderTopWidth:0,
                    elevation:0,

                },
                tabBarActiveTintColor:'#aac7ff',
                tabBarInactiveTintColor:'gray',
        })}>
            <Tab.Screen options={{headerShown : false}} name={homename} component={HomeScreen} />
            <Tab.Screen options={{headerShown : false}} name={SensorName} component={Sensorpage} />
            <Tab.Screen options={{headerShown : false}} name={Timename} component={Time}/>
            <Tab.Screen options={{headerShown : false}} name={Settingsname} component={Settings} />

        </Tab.Navigator>
  )
}

export default MainContainer

const styles = StyleSheet.create({
    tab:{
        backgroundColor:'#032b5b'
    }
})