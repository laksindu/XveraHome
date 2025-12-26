import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import main from './screens/main';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import main1 from './screens/main1';
import Homemain from './screens/Homemain';
import MainContainer from './screens/MainContainer';
import Settings from './screens/Settings';

const App= ()=> {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  const Stack = createNativeStackNavigator();
  const initialRouteName = user ? "Home" : "LoginScreen";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen options={{headerShown : false}} name="LoginScreen"  component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Main" component={main}/>
        <Stack.Screen options={{headerShown: false}} name='main1' component={main1}/>
        <Stack.Screen options={{headerShown : false}} name='Homemain' component={Homemain}/>
        <Stack.Screen options ={{headerShown : false}} name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen options ={{headerShown : false}} name="Home" component={MainContainer} />
        <Stack.Screen options={{headerShown : false}} name = 'Settings' component={Settings}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;