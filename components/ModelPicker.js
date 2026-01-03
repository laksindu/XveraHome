import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import React,{useEffect,useState} from 'react';
import { Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';




const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width

const ModelPicker = ({ changevidible, type, setData, setActionData , setData1}) => {

const[s1,setS1] = useState("Switch 1")
const[s2,setS2] = useState("Switch 2")
const[s3,setS3] = useState("Siwtch 3")
const[s4,setS4] = useState("Switch 4")

const SWITCHES = ['Switch 1','Switch 2','Switch 3','Switch 4'];// these are keys
const ACTIONS = ['ON','OFF'];

const SWITCH_NAMES = { // these are display names
  'Switch 1': `${s1}`, // these are values
  'Switch 2': `${s2}`,
  'Switch 3': `${s3}`,
  'Switch 4': `${s4}`,
};

const ACTION_NAMES = {
  ON: 'Turn ON',
  OFF: 'Turn OFF',
};

useEffect(()=>{
    const SetData = async ()=>{
        const SavedData = await AsyncStorage.getItem("data")
        if(SavedData){
            console.log(SavedData)
            const parsData = JSON.parse(SavedData)
            setS1(parsData.Switch_1)
            setS2(parsData.Switch_2)
            setS3(parsData.Switch_3)
            setS4(parsData.Switch_4)
        }
    }
    SetData()
})


  const onPressItem = (item) => {
    if (type === 'switch') {
      setData(SWITCH_NAMES[item] ?? item);
      setData1(item);
    } else {
      setActionData(item);
    }
    changevidible(false);
  };

  const list = type === 'switch' ? SWITCHES : ACTIONS;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => changevidible(false)}
    >
      <View style={styles.modal}>
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onPressItem(item)}
          >
            <Text style={styles.text}>
              {type === 'switch'
                ? SWITCH_NAMES[item] ?? item
                : ACTION_NAMES[item] ?? item}
            </Text>

            <Avatar.Image
            source={require('../assets/power.png')}
            size={30}
            backgroundColor = 'white'
            />
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default ModelPicker;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
  },
  modal:{
    backgroundColor:'#fff',
    borderRadius:10,
    width:350,
    paddingVertical:10,
  },
  option:{
    flexDirection:'row',
    paddingVertical:10,
    justifyContent:'space-between',
    marginRight:ScreenWidth*0.05,
    alignItems:'center'
  },
  text:{
    fontSize:19,
    marginLeft:ScreenWidth*0.05,
    fontWeight:'bold'
  },
});
