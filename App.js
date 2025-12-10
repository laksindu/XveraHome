import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import main from './screens/main';
import { auth } from './firebase';
import { useNavigation } from '@react-navigation/native';



const App= ()=> {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown : false}} name="LoginScreen"  component={LoginScreen} />
        <Stack.Screen options ={{headerShown : false}} name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen options ={{headerShown : false}} name="Home" component={HomeScreen} />
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